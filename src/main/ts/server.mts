import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/mongo-social`)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

    app.listen(parseInt(process.env.SERVER_PORT!), () => console.log(`Listening on port http://localhost:${process.env.SERVER_PORT}`));
