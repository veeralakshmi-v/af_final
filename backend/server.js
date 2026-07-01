const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body payload
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize()); // Must be after body parsers

// Serve static files from public directory
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://Kousi:kousi123@ac-ghxrlka-shard-00-00.mhwhksc.mongodb.net:27017,ac-ghxrlka-shard-00-01.mhwhksc.mongodb.net:27017,ac-ghxrlka-shard-00-02.mhwhksc.mongodb.net:27017/af_website?ssl=true&replicaSet=atlas-zaziw0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/materials', require('./routes/materials'));
app.use('/api/sections', require('./routes/sections'));
app.use('/api/content', require('./routes/content'));
app.use('/api/inquiries', require('./routes/inquiries'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
