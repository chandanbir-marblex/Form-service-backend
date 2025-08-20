import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URI}/form`;
    console.log(`Connecting to MongoDB at ${connectionString}`);
    const connectionInstance = await mongoose.connect(connectionString);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('MONGODB connection FAILED ', error);
    process.exit(1);
  }
};

export default connectDB;
