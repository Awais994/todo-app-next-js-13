import mongoose from "mongoose";

const MONGODB_URL = process.env.DB_URL;

const dbConnect = async () => {
  mongoose.set("strictQuery", false);
  mongoose.set("bufferCommands", false);
  if (mongoose.connections[0].readyState) {
    return console.log("DB already Connected");
  }
  await mongoose
    .connect(MONGODB_URL)
    .then((res) => {
      console.log("DB CONNECTED");
    })
    .catch((err) => {
      console.log("DB NOT CONNECTED");
    });
};

export default dbConnect;
