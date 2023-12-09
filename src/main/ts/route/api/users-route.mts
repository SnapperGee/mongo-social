import { getAllUsers, getUserById, createUser } from "../../controller/users-controller.mjs";
import { Router } from "express";

export const usersRoute = Router();

usersRoute.get("/users", getAllUsers);
usersRoute.get("/users/:id", getUserById);
usersRoute.post("/users", createUser);

export default usersRoute;
