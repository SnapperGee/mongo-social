import { connection } from "./connection.mjs";
import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.once("open", () => {
    app.listen(parseInt(process.env.SERVER_PORT!), () => console.log(`Listening on port http://localhost:${process.env.SERVER_PORT}`));
});
