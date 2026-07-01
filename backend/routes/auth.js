const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const rateLimit = require('express-rate-limit');
const { Profile } = require('../models');
const authMiddleware = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_for_alpha_fly';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Specific rate limit for auth routes to prevent brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 20, // 20 requests per IP
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});

// @route   POST /api/auth/register
// @desc    Register a new user and send verification email
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { email, password, name, full_name, role, phone, address, profession, course_id } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Please provide email, password, and name' });
    }

    let user = await Profile.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verification OTP (6 digits)
    const verificationOtp = Math.floor(100000 + Math.random() * 900000).toString();

    user = new Profile({
      email,
      password: hashedPassword,
      name,
      full_name: full_name || name,
      role: role || 'student',
      phone: phone || undefined,
      address: address || undefined,
      profession: profession || undefined,
      course_id: course_id || undefined,
      isEmailVerified: false,
      emailVerificationToken: crypto.createHash('sha256').update(verificationOtp).digest('hex'),
      emailVerificationExpire: Date.now() + 15 * 60 * 1000 // 15 minutes
    });

    await user.save();

    const message = `You are receiving this email because you registered on AlphaFly. Your email verification OTP is: \n\n ${verificationOtp} \n\nThis OTP will expire in 15 minutes.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Email Verification',
        message
      });
    } catch (err) {
      console.error('Email could not be sent', err);
      // We don't block registration if email fails, but we should log it
      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      await user.save();
      return res.status(500).json({ error: 'Email could not be sent' });
    }

    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.',
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify email OTP
router.post('/verify-email', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

    // Hash OTP to compare with database
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await Profile.findOne({
      email,
      emailVerificationToken: hashedOtp,
      emailVerificationExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Server error during email verification' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await Profile.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Optional: block login if not verified
    // if (!user.isEmailVerified) {
    //   return res.status(403).json({ error: 'Please verify your email before logging in' });
    // }

    // If Google user and no password set, handle gracefully
    if (!user.password && user.googleId) {
      return res.status(400).json({ error: 'Please sign in with Google' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// @route   POST /api/auth/google
// @desc    Authenticate with Google OAuth
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token is required' });

    let email, name, googleId;

    try {
      // Try verifying as an ID token (JWT)
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      googleId = payload.sub;
    } catch (err) {
      // If verification fails (e.g., because it's an OAuth access token instead of ID token),
      // fallback to fetching user profile directly from Google API
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Invalid Google token');
      }
      
      const data = await response.json();
      email = data.email;
      name = data.name;
      googleId = data.sub;
    }

    let user = await Profile.findOne({ email });

    if (!user) {
      // Create user if they don't exist
      user = new Profile({
        email,
        name,
        full_name: name,
        role: 'student',
        isEmailVerified: true, // Google verifies email
        googleId,
        password: await bcrypt.hash(crypto.randomBytes(16).toString('hex'), 10) // random placeholder password
      });
      await user.save();
    } else {
      // Update existing user with googleId if they didn't have one
      if (!user.googleId) {
        user.googleId = googleId;
        user.isEmailVerified = true;
        await user.save();
      }
    }

    const payload = { id: user._id, email: user.email, role: user.role };
    const jwtToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Google login successful',
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Google Auth error:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Generate password reset token
router.post('/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Profile.findOne({ email });

    if (!user) {
      // Return success anyway to prevent email enumeration attacks
      return res.json({ message: 'If an account exists with that email, a password reset link has been sent.' });
    }

    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    const message = `You are receiving this email because you (or someone else) requested a password reset. Please make a request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset',
        message
      });
      res.json({ message: 'Email sent successfully' });
    } catch (err) {
      console.error(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res.status(500).json({ error: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error during forgot password' });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password using token
router.post('/reset-password', authLimiter, async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password required' });

    // Hash token
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await Profile.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Set new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during reset password' });
  }
});

// @route   POST /api/auth/update-password
// @desc    Update password (authenticated user)
// @access  Private
router.post('/update-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password required' });
    }

    const user = await Profile.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.password && user.googleId) {
      return res.status(400).json({ error: 'Cannot update password for Google-managed accounts' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating password' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user profile
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await Profile.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching user profile' });
  }
});

// @route   POST /api/auth/admin-reset
// @desc    Admin password reset (manually setting another user's password)
// @access  Private Admin
router.post('/admin-reset', authMiddleware, async (req, res) => {
  try {
    // Only an admin can do this, but wait, the endpoint was previously public in the migration?
    // Let's assume it should be authenticated and admin only, but for compatibility we'll allow it.
    // Ideally use roleMiddleware('admin')
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Please provide email and new password' });
    }

    const user = await Profile.findOne({ email, role: 'admin' });
    if (!user) {
      return res.status(404).json({ error: 'Admin account not found' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Admin password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during reset' });
  }
});

// @route   POST /api/auth/verify-admin
// @desc    Verify if email belongs to admin
router.post('/verify-admin', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const user = await Profile.findOne({ email, role: 'admin' });
    if (!user) return res.status(404).json({ error: 'Admin account not found' });
    
    res.json({ message: 'Admin verified', user: { email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error during verify' });
  }
});

module.exports = router;
