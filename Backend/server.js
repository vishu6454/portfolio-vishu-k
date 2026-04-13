// server.js (updated version)
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import contactRoutes from './routes/contactRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://portfolio-omega-three-74.vercel.app', 
    'https://portfolio-vishu-k.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGO_URI is not defined in .env file');
      process.exit(1);
    }
    
    console.log(`📡 Attempting to connect to MongoDB...`);
    
    // Add connection options for better reliability
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10s for slow cold starts
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB connected successfully to: ${mongoose.connection.host}`);
    
    // Test the connection
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Initial connection
connectDB();

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected to database');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
  setTimeout(connectDB, 5000);
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check with detailed info
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.status(200).json({ 
    success: true,
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    mongodbConnected: dbState === 1,
    mongodbStatus: dbStatus[dbState] || 'unknown',
    environment: process.env.NODE_ENV
  });
});

// Test endpoint to check database
app.get('/api/test-db', async (req, res) => {
  try {
    const count = await mongoose.connection.db.collection('testimonials').countDocuments();
    res.json({ 
      success: true, 
      connected: mongoose.connection.readyState === 1,
      testimonialCount: count 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      testimonials: '/api/testimonials',
      testDb: '/api/test-db'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.path} not found` 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🍃 MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected'}`);
});

export default app;