import { usersRoute } from "./users-route.mjs";
import { thoughtRoute } from "./thoughts-route.mjs";
import { Router } from "express";

export const apiRoute = Router();

apiRoute.use("/api", usersRoute, thoughtRoute);

export default apiRoute;
