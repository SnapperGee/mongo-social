import { Thought } from "../model/thought.mjs";
import type { Request, Response } from "express";

export const getAllThoughts = async (req: Request, res: Response) =>
{
    try
    {
        const thoughts = await Thought.find().select("-__v")
                                             .populate("user", "-__v -thoughts");
        return res.json(thoughts);
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};
