import { users } from "./users.mjs";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const reactionBodyStrings = [
    "That's so inspiring! Thanks for sharing your journey.",
    "Absolutely stunning photo! Where was this taken?",
    "Haha, this made my day!",
    "Incredible achievement, congratulations!",
    "So cute!",
    "Wow, that's really thought-provoking. Thanks for the insight.",
    "This is so relatable. Thanks for posting.",
    "Amazing work! You're so talented.",
    "This is hilarious! Can't stop laughing.",
    "Really needed to hear this today, thank you."
];

export const reactions = reactionBodyStrings.map((reactionBody, index) => {
    const createdAt = getRandomDate(new Date(2020, 0, 1), new Date());
    const updatedAt = getRandomDate(createdAt, new Date());
    return { _id: new ObjectId(), user: users[index]._id, reactionBody, createdAt, updatedAt };
});
