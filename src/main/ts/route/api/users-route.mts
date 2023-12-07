import { usersGetRequest } from "../../controller/users-controller.mjs";
import { Router } from "express";

export const usersRoute = Router();

usersRoute.get("/users", usersGetRequest);

export default usersRoute;
