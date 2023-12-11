import { getAllThoughts } from "../../controller/thoughts-controller.mjs";
import { Router } from "express";

export const thoughtRoute = Router();

thoughtRoute.get("/thoughts", getAllThoughts);

export default thoughtRoute;
