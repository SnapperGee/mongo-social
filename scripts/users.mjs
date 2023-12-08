import { randomIds } from "./util.mjs";
import { Types } from "mongoose";
const { ObjectId } = Types;

export const users = Object.freeze([
    { _id: new ObjectId(), username: "user1", email: "user1@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user2", email: "user2@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user3", email: "user3@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user4", email: "user4@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user5", email: "user5@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user6", email: "user6@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user7", email: "user7@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user8", email: "user8@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user9", email: "user9@example.com", thoughts: randomIds(10) },
    { _id: new ObjectId(), username: "user10", email: "user10@example.com", thoughts: randomIds(10) }
]);
