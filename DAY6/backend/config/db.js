import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
