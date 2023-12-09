import { getAllUsers, getUserById, createUser, updateUser } from "../../controller/users-controller.mjs";
import { Router } from "express";

export const usersRoute = Router();

usersRoute.get("/users", getAllUsers);
usersRoute.get("/users/:id", getUserById);
usersRoute.post("/users", createUser);
usersRoute.put("/users/:id", updateUser);

export default usersRoute;
