import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/mongo-social`)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

export const connection = mongoose.connection;

export default connection;
