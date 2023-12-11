import { getAllThoughts, getThoughtById, createThought } from "../../controller/thoughts-controller.mjs";
import { Router } from "express";

export const thoughtRoute = Router();

thoughtRoute.get("/thoughts/:id", getThoughtById);
thoughtRoute.get("/thoughts", getAllThoughts);

thoughtRoute.post("/thoughts", createThought);

export default thoughtRoute;
