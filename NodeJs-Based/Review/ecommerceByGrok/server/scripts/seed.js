const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Product = require('../models/Product');
const { MONGODB_URI } = require('../config');

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Seed admin user
    const admin = new User({
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
      isAdmin: true,
    });
    await admin.save();

    // Seed regular user
    const user = new User({
      username: 'user',
      password: await bcrypt.hash('password', 10),
    });
    await user.save();

    // Seed products
    const products = [
      {
        name: 'Laptop',
        description: 'High-performance laptop for professionals',
        price: 999.99,
        category: 'Electronics',
        image: '/images/product.jpg',
      },
      {
        name: 'Smartphone',
        description: 'Latest smartphone with advanced features',
        price: 699.99,
        category: 'Electronics',
        image: '/images/product.jpg',
      },
      {
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 19.99,
        category: 'Clothing',
        image: '/images/product.jpg',
      },
    ];
    await Product.insertMany(products);

    console.log('Database seeded successfully');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  });