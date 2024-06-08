import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DB_URL);
    console.log(
      `✔ MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("✘ MONGODB connection failed: ", error);
    process.exit(1);
  }
};
