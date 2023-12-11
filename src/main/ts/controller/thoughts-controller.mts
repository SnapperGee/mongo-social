import { Thought } from "../model/thought.mjs";
import { User } from "../model/user.mjs";
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

export const createThought = async (req: Request, res: Response) =>
{
    const {userId, thoughtText} = req.body;

    if ( ! userId)
    {
        return res.status(400).json({message: "User ID is required."});
    }

    if ( ! isValidId(userId))
    {
        return res.status(422).json({message: `Malformed user ID: "${userId}"`});
    }

    if ( ! thoughtText)
    {
        return res.status(400).json({message: "Thought text is required."});
    }

    try
    {
        if (await User.exists({userId}))
        {
            return res.status(409).json({message: "Invalid user ID."});
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }

    try
    {
        const newThought = await Thought.create({thoughtText, user: userId});
        const thoughtAddedToUser = await User.findByIdAndUpdate(userId, {$addToSet: {thoughts: newThought._id}}, {new: true});
        return res.status(201).json({newThought, addedToUser: thoughtAddedToUser});
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};
