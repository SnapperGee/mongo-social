import { User } from "../model/user.mjs";
import { Thought } from "../model/thought.mjs";
import type { Request, Response } from "express";
import { Types } from "mongoose";
const isValidId = Types.ObjectId.isValid;

export const getAllThoughts = async (req: Request, res: Response) =>
{
    try
    {
        const thoughts = await Thought.find().select("-__v")
                                             .populate("user", "-__v -thoughts");
        res.json(thoughts);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json(error);
    }
};
