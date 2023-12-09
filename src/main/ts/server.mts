import { route } from "./route/index.mjs";
import express from "express";
import "dotenv/config";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);

export default app;
