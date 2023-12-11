import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../../controller/users-controller.mjs";
import { addFriendToUser, deleteFriendFromUser } from "../../controller/users-friends-controller.mjs";
import { Router } from "express";

export const usersRoute = Router();

usersRoute.get("/users/:id", getUserById);
usersRoute.get("/users", getAllUsers);

usersRoute.put("/users/:id", updateUser);

usersRoute.post("/users/:userId/friends/:friendId", addFriendToUser);
usersRoute.post("/users", createUser);

usersRoute.delete("/users/:userId/friends/:friendId", deleteFriendFromUser);
usersRoute.delete("/users/:id", deleteUser);

export default usersRoute;
