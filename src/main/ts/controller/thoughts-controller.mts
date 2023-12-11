import { Thought } from "../model/thought.mjs";
import type { Request, Response } from "express";
import { Types } from "mongoose";
const isValidId = Types.ObjectId.isValid;

export const getAllThoughts = async (req: Request, res: Response) =>
{
    try
    {
        const thoughts = await Thought.find().select("-__v")
                                             .populate("user", "-__v");
        return res.json(thoughts);
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const getThoughtById = async (req: Request, res: Response) =>
{
    if ( ! isValidId(req.params.id))
    {
        return res.status(422).json({message: `Malformed thought ID: "${req.params.id}"`});
    }

    try
    {
        const users = await Thought.findById(req.params.id)
            .select("-__v")
            .populate("user", "-__v");

        return res.json(users);
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};
