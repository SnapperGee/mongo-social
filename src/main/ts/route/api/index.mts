import { usersRoute } from "./users-route.mjs";
import { Router } from "express";

export const apiRoute = Router();

apiRoute.use("/api", usersRoute);

export default apiRoute;
