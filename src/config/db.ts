import mongoose from "mongoose";
const DEV_URI = process.env.DB 


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(DEV_URI as string);
    console.log(
      `\n MongoDB connected | DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
