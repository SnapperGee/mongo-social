import { getAllThoughts, getThoughtById } from "../../controller/thoughts-controller.mjs";
import { Router } from "express";

export const thoughtRoute = Router();

thoughtRoute.get("/thoughts/:id", getThoughtById);
thoughtRoute.get("/thoughts", getAllThoughts);

export default thoughtRoute;
