require('dotenv').config();
const mongoose = require('mongoose');
const seedCategories = require('./seeders/categorySeeder');
const seedServices = require('./seeders/serviceSeeder');

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
.then(async () => {
  console.log('Connected to MongoDB');
  // Seed data after successful connection
  await seedCategories();
  await seedServices();
  console.log('Seeding completed successfully');
  process.exit(0);
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
}); 