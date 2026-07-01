import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '@/lib/api';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  useEffect(() => {
    // Check if we have a token in the URL
    const checkSession = async () => {
      try {
        const accessToken = searchParams.get('access_token');
        const token = searchParams.get('token'); // or simple token

        if (accessToken || token) {
          console.log('Recovery token found');
          setSessionReady(true);
        } else {
          // No valid recovery token found
          console.log('No valid recovery token found in URL');
          setSessionError('This password reset link is invalid or has expired');
        }
      } finally {
        setTimeout(() => {
          if (!sessionReady && !sessionError) {
            setSessionError('Unable to process password reset link');
          }
        }, 1000);
      }
    };

    checkSession();
  }, [searchParams, sessionReady]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const token = searchParams.get('access_token') || searchParams.get('token');
      await api.post('/auth/reset-password', {
        token: token,
        newPassword: password
      });

      toast({
        title: "Success",
        description: "Password updated successfully! You can now log in with your new password.",
      });
      
      // Redirect to login page after successful password reset
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Glassmorphism Card */}
      <Card className="w-full max-w-md mx-auto relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl shadow-black/10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-lg" />
        <CardHeader className="text-center pb-6 relative">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-primary to-primary/60 rounded-2xl text-primary-foreground px-4 py-2 font-bold text-2xl shadow-lg">
              <Lock className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
          <p className="text-foreground/80 font-medium">Create your new password</p>
        </CardHeader>
        
        <CardContent className="relative">
          {!sessionReady && !sessionError && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
              <p className="text-foreground/70">Verifying reset link...</p>
            </div>
          )}

          {sessionError && (
            <div className="space-y-4">
              <div className="p-4 bg-destructive/20 border border-destructive/50 rounded-lg">
                <p className="text-destructive font-medium">{sessionError}</p>
              </div>
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
              >
                Back to Login
              </Button>
            </div>
          )}

          {sessionReady && !sessionError && (
            <>
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-medium">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                      minLength={6}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-foreground placeholder:text-foreground/50 focus:bg-white/20 transition-all pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/20 text-foreground/70 hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-foreground/60 mt-1">Minimum 6 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-foreground font-medium">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-foreground placeholder:text-foreground/50 focus:bg-white/20 transition-all"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 animate-spin" />
                      Updating password...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Update Password
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-sm text-foreground/70 hover:text-foreground hover:bg-white/10"
                >
                  Back to Login
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};