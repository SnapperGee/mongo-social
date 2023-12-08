import { Types } from "mongoose";
const { ObjectId } = Types;

export const randomIds = (maxNum) => {
    const ids = [];
    for (let i = 0; i < Math.floor(Math.random() * maxNum); i++) {
        ids.push(new ObjectId());
    }
    return ids;
};

export const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
