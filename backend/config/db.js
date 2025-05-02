import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://vrikshnet:vrikshJ1934@cluster0.im3tkkr.mongodb.net/vriksh-consulting"
    )
    .then(() => console.log("Databse Connected"));
};

//
