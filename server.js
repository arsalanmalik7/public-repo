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
    'http://localhost:3000',
    'http://localhost:3001', // React Admin panel
    'https://*.ngrok-free.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
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

// MongoDB Connection - Temporarily disabled
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Server is accessible at http://localhost:${PORT}`);
}); 