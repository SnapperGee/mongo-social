import { users } from "./users.mjs";
import { getRandomDate } from "./util.mjs";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const MIN_NUM_REACTIONS = 200;
const MAX_NUM_REACTIONS = 400;

export const reactions = [];

for (let index = 0; index < Math.floor(Math.random() * (MAX_NUM_REACTIONS - MIN_NUM_REACTIONS) + MIN_NUM_REACTIONS); index++)
{
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const createdAt = getRandomDate(new Date(2020, 0, 1), new Date());
    const updatedAt = getRandomDate(createdAt, new Date());

    const reactionBody = `Reaction ${reactions.filter(_reaction => _reaction.user === randomUser._id).length + 1} by ${randomUser.username}`;

    const reaction = { _id: new ObjectId(), user: randomUser._id, reactionBody, createdAt, updatedAt };

    reactions.push(reaction);
};
