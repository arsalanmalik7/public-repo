require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categoryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const requestRoutes = require('./routes/requestRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const contactSupportRoutes = require('./routes/contactSupportRoutes');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const seedCategories = require('./seeders/categorySeeder');
const seedServices = require('./seeders/serviceSeeder');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:8100',
    'capacitor://localhost', // Capacitor mobile
    'ionic://localhost',     // Ionic mobile
    'http://localhost', 
    'https://localhost', 
    'http://localhost:3000',
    'http://localhost:3001', // React Admin panel
    'https://*.ngrok-free.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Custom CORS middleware with detailed logging
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const method = req.method;
  
  // Log all CORS-related requests
  if (origin) {
    console.log(`🌐 CORS Request: ${method} ${req.path} from origin: ${origin}`);
    
    // Check if origin is allowed
    const isAllowed = corsOptions.origin.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Handle wildcard patterns like https://*.ngrok-free.app
        const pattern = allowedOrigin.replace('*', '.*');
        const regex = new RegExp('^' + pattern + '$');
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (!isAllowed) {
      console.error(`❌ CORS ISSUE: Origin "${origin}" is not allowed!`);
      console.log(`📋 Allowed origins:`, corsOptions.origin);
      console.log(`💡 Consider adding "${origin}" to the CORS configuration`);
    } else {
      console.log(`✅ CORS: Origin "${origin}" is allowed`);
    }
  }
  
  next();
});

// Apply CORS middleware
app.use(cors(corsOptions));

// Additional CORS error handling
app.use((req, res, next) => {
  // Check if request was blocked by CORS
  res.on('finish', () => {
    if (res.statusCode === 403 || (res.statusCode >= 400 && req.headers.origin)) {
      console.error(`🚫 Potential CORS Issue: ${req.method} ${req.path} returned ${res.statusCode}`);
      console.log(`🔍 Request details:`, {
        origin: req.headers.origin,
        method: req.method,
        path: req.path,
        userAgent: req.headers['user-agent']
      });
    }
  });
  next();
});

// Body parser middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', requestRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contact-support', contactSupportRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('Connected to MongoDB');
  // Seed data after successful connection
  seedCategories();
  seedServices();
})
.catch(err => console.error('MongoDB connection error:', err));

console.log('MongoDB connection temporarily disabled - server running without database');

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  
  // Check if error might be CORS-related
  if (err.message.includes('CORS') || err.message.includes('origin')) {
    console.error('🌐 CORS-related error detected!');
    console.log('🔧 Check your CORS configuration and allowed origins');
  }
  
  res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404 errors with CORS info
app.use('*', (req, res) => {
  console.log(`⚠️  404 Not Found: ${req.method} ${req.originalUrl}`);
  if (req.headers.origin) {
    console.log(`🌐 Request origin: ${req.headers.origin}`);
  }
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌍 Server is accessible at http://localhost:${PORT}`);
  console.log(`🔒 CORS configured for origins:`, corsOptions.origin);
  console.log(`📡 Allowed methods:`, corsOptions.methods);
});
