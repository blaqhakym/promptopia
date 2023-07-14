import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
 mongoose.set("strictQuery", true);
  
  if (isConnected) {
    console.log("mongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('mongo db is connected')
    isConnected = true
  } catch (error) {
    console.log(error.message);
  }
};


