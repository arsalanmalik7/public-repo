const mongoose = require('mongoose');
const Service = require('../models/Service');

const services = [
  // Plumbing Services
  {
    name: 'Leak Repair',
    description: 'Fix leaking pipes and faucets',
    imageUrl: 'assets/cat1.png',
    category: 'Plumbing',
    price: 75
  },
  {
    name: 'Drain Cleaning',
    description: 'Professional drain cleaning and unclogging services',
    imageUrl: 'assets/cat2.png',
    category: 'Plumbing',
    price: 100
  },
  {
    name: 'Water Heater Installation',
    description: 'Installation and repair of water heaters',
    imageUrl: 'assets/cat3.png',
    category: 'Plumbing',
    price: 250
  },
  {
    name: 'Pipe Replacement',
    description: 'Replace old or damaged pipes',
    imageUrl: 'assets/cat4.png',
    category: 'Plumbing',
    price: 150
  },
  {
    name: 'Bathroom Remodeling',
    description: 'Complete bathroom renovation services',
    imageUrl: 'assets/cat5.png',
    category: 'Plumbing',
    price: 500
  },
  {
    name: 'Emergency Plumbing',
    description: '24/7 emergency plumbing services',
    imageUrl: 'assets/cat6.png',
    category: 'Plumbing',
    price: 200
  },
  // Welding Services
  {
    name: 'Metal Fabrication',
    description: 'Custom metal fabrication and welding services',
    imageUrl: 'assets/cat1.png',
    category: 'Welding',
    price: 120
  },
  {
    name: 'Pipe Welding',
    description: 'Professional pipe welding and repair services',
    imageUrl: 'assets/cat2.png',
    category: 'Welding',
    price: 150
  },
  {
    name: 'Structural Welding',
    description: 'Structural steel welding and construction',
    imageUrl: 'assets/cat3.png',
    category: 'Welding',
    price: 200
  },
  {
    name: 'Aluminum Welding',
    description: 'Specialized aluminum welding services',
    imageUrl: 'assets/cat4.png',
    category: 'Welding',
    price: 180
  },
  {
    name: 'Emergency Welding',
    description: '24/7 emergency welding and repair',
    imageUrl: 'assets/cat5.png',
    category: 'Welding',
    price: 250
  },
  // House Keeping Services
  {
    name: 'Regular Cleaning',
    description: 'Weekly or monthly house cleaning services',
    imageUrl: 'assets/cat1.png',
    category: 'House Keeping',
    price: 80
  },
  {
    name: 'Deep Cleaning',
    description: 'Thorough deep cleaning of entire house',
    imageUrl: 'assets/cat2.png',
    category: 'House Keeping',
    price: 150
  },
  {
    name: 'Move-in/Move-out Cleaning',
    description: 'Complete cleaning for moving transitions',
    imageUrl: 'assets/cat3.png',
    category: 'House Keeping',
    price: 200
  },
  {
    name: 'Window Cleaning',
    description: 'Professional window and glass cleaning',
    imageUrl: 'assets/cat4.png',
    category: 'House Keeping',
    price: 60
  },
  // Painting Services
  {
    name: 'Interior Painting',
    description: 'Professional interior wall painting',
    imageUrl: 'assets/cat1.png',
    category: 'Painting',
    price: 100
  },
  {
    name: 'Exterior Painting',
    description: 'House exterior painting and coating',
    imageUrl: 'assets/cat2.png',
    category: 'Painting',
    price: 300
  },
  {
    name: 'Commercial Painting',
    description: 'Commercial building painting services',
    imageUrl: 'assets/cat3.png',
    category: 'Painting',
    price: 400
  },
  // Electrical Services
  {
    name: 'Electrical Repairs',
    description: 'General electrical repair and maintenance',
    imageUrl: 'assets/cat1.png',
    category: 'Electrical',
    price: 120
  },
  {
    name: 'Wiring Installation',
    description: 'New electrical wiring and installation',
    imageUrl: 'assets/cat2.png',
    category: 'Electrical',
    price: 250
  },
  {
    name: 'Lighting Installation',
    description: 'Professional lighting fixture installation',
    imageUrl: 'assets/cat3.png',
    category: 'Electrical',
    price: 150
  },
  // Carpentry Services
  {
    name: 'Custom Furniture',
    description: 'Custom wood furniture and cabinetry',
    imageUrl: 'assets/cat1.png',
    category: 'Carpentry',
    price: 300
  },
  {
    name: 'Door Installation',
    description: 'Interior and exterior door installation',
    imageUrl: 'assets/cat2.png',
    category: 'Carpentry',
    price: 200
  },
  {
    name: 'Window Installation',
    description: 'Window replacement and installation',
    imageUrl: 'assets/cat3.png',
    category: 'Carpentry',
    price: 250
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