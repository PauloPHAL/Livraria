import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/livraria');
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to database');
  }
};

export default connectDB;