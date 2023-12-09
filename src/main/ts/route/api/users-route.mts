import { getAllUsers } from "../../controller/users-controller.mjs";
import { Router } from "express";

export const usersRoute = Router();

usersRoute.get("/users", getAllUsers);

export default usersRoute;
