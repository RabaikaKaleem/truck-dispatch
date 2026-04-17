/**
 * Run this script ONCE to create the admin account.
 * Usage: node seedAdmin.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    const existing = await User.findOne({ email: 'admin@truck.com' });
    if (existing) {
      console.log('⚠️  Admin already exists! Email: admin@truck.com');
      process.exit(0);
    }

    await User.create({
      name: 'Admin User',
      email: 'admin@truck.com',
      password: 'admin123',
      role: 'admin',
      status: 'active',
    });

    console.log('✅ Admin created successfully!');
    console.log('   Email:    admin@truck.com');
    console.log('   Password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seed();
