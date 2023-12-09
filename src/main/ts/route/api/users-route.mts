import { getAllUsers, getUserById, createUser, updateUser, deleteUser, addFriendToUser } from "../../controller/users-controller.mjs";
import { Router } from "express";

export const usersRoute = Router();

usersRoute.get("/users", getAllUsers);
usersRoute.get("/users/:id", getUserById);
usersRoute.post("/users/:userId/friends/:friendId", addFriendToUser);
usersRoute.post("/users", createUser);
usersRoute.put("/users/:id", updateUser);
usersRoute.delete("/users/:id", deleteUser);

export default usersRoute;
