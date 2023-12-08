import { users } from "./users.mjs";
import { reactions } from "./reactions.mjs";
import { getRandomDate } from "./util.mjs";

const reactionsCopy = Array.from(reactions);

export const thoughts = users.flatMap(user => {
    return user.thoughts.map((thoughtId, index) => {
        const thoughtText = `Thought ${index + 1} by ${user.username}`;
        const thoughtUser = user._id;
        const thoughtReactions = reactionsCopy.splice(0, Math.floor(Math.random() * Math.floor(reactionsCopy.length / 4)));
        const createdAt = getRandomDate(new Date(2020, 0, 1), new Date());
        const updatedAt = getRandomDate(createdAt, new Date());
        return { _id: thoughtId, thoughtText, user: thoughtUser, reactions: thoughtReactions, createdAt, updatedAt };
    });
});
