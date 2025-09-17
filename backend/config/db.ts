import mongoose from "mongoose";

export const  connectdb  = () => {
    //Connect to database mongodb
    mongoose.connect(process.env.MONGO_URI as string)
      .then(() => console.log("MongoDB connected"))
      .catch(err => console.error(err));
}