const mongoose = require('mongoose');
const Service = require('../models/Service');

const services = [
  {
    name: 'Leak Repair',
    description: 'Fix leaking pipes and faucets',
    imageUrl: 'assets/cat1.png',
    category: 'plumbing',
    price: 75
  },
  {
    name: 'Drain Cleaning',
    description: 'Professional drain cleaning and unclogging services',
    imageUrl: 'assets/cat2.png',
    category: 'plumbing',
    price: 100
  },
  {
    name: 'Water Heater Installation',
    description: 'Installation and repair of water heaters',
    imageUrl: 'assets/cat3.png',
    category: 'plumbing',
    price: 250
  },
  {
    name: 'Pipe Replacement',
    description: 'Replace old or damaged pipes',
    imageUrl: 'assets/cat4.png',
    category: 'plumbing',
    price: 150
  },
  {
    name: 'Bathroom Remodeling',
    description: 'Complete bathroom renovation services',
    imageUrl: 'assets/cat5.png',
    category: 'plumbing',
    price: 500
  },
  {
    name: 'Emergency Plumbing',
    description: '24/7 emergency plumbing services',
    imageUrl: 'assets/cat6.png',
    category: 'plumbing',
    price: 200
  }
];

const seedServices = async () => {
  try {
    await Service.deleteMany({}); // Clear existing services
    await Service.insertMany(services);
    console.log('Services seeded successfully');
  } catch (error) {
    console.error('Error seeding services:', error);
  }
};

module.exports = seedServices; 