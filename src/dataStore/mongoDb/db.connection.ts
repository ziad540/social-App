import mongoose from "mongoose";

export async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB Connected Successfully");

    } catch (e) {

    }
}