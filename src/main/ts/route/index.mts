import { Router } from "express";
import { apiRoute } from "./api/index.mjs";

export const route = Router();

route.use(apiRoute);

export default route;
