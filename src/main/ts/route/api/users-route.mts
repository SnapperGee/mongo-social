import { getAllUsers, getUserById } from "../../controller/users-controller.mjs";
import { Router } from "express";

export const usersRoute = Router();

usersRoute.get("/users", getAllUsers);
usersRoute.get("/users/:id", getUserById);

export default usersRoute;
