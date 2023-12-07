import { users } from "./users.mjs";
import { reactions } from "./reactions.mjs";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const generateThoughtsArray = (numItems) => {
    const array = [];

    for (let i = 0; i < numItems; i++) {
      const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10000000000)); // Random date in the past
      const updatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 1000000000)); // Random date after createdAt

      array.push({
        _id: new ObjectId(),
        thoughtText: `Thought ${i + 1}`,
        user: users[i]._id,
        reactions: [reactions[i]],
        createdAt: createdAt,
        updatedAt: updatedAt
      });
    }

    return array;
  }

  export const thoughts = generateThoughtsArray(10);
