import { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought } from "../../controller/thoughts-controller.mjs";
import { Router } from "express";

export const thoughtRoute = Router();

thoughtRoute.get("/thoughts/:id", getThoughtById);
thoughtRoute.get("/thoughts", getAllThoughts);

thoughtRoute.post("/thoughts", createThought);

thoughtRoute.put("/thoughts/:id", updateThought);

thoughtRoute.delete("/thoughts/:id", deleteThought);

export default thoughtRoute;
