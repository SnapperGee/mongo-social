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
        if ( ! await User.exists({userId}))
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

export const updateThought = async (req: Request, res: Response) =>
{
    const id = req.params.id;

    if ( ! id)
    {
        return res.status(400).json({message: "Thought ID is required."});
    }

    if ( ! isValidId(id))
    {
        return res.status(422).json({message: `Malformed thought ID: "${id}"`});
    }

    try
    {
        if ( ! await Thought.exists({_id: id}))
        {
            return res.status(404).json({message: "Invalid thought ID."});
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }

    if (req.body.user)
    {
        return res.status(405).json({message: `Thought user cannot be changed."`});
    }

    if (req.body.reactions)
    {
        if ( ! (req.body.reactions instanceof Array))
        {
            return res.status(422).json({message: "Non array of reaction IDs."});
        }

        const invalidReactionsIdIndexes: readonly number[] = req.body.reactions.reduce(
            (accumulator: number[], reactionId: string, index: number) =>
            {
                if ( ! isValidId(reactionId))
                {
                    accumulator.push(index);
                }

                return accumulator;
            },
            []
        );

        if (invalidReactionsIdIndexes.length !== 0)
        {
            return res.status(422).json({message: `Malformed reaction ID(s): "${invalidReactionsIdIndexes.map(index => req.body.reactions[index]).join('", "')}"`});
        }

        try
        {
            if (req.body.reactions.length !== 0 && await Thought.exists({_id: {$nin: req.body.reactions}}))
            {
                return res.status(404).json({message: "Invalid reaction ID(s)."});
            }
        }
        catch (error)
        {
            console.error(error);
            return res.status(500).json(error);
        }
    }

    try
    {
        const updatedThought = await Thought.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return res.json(updatedThought);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const deleteThought = async (req: Request, res: Response) =>
{
    const id = req.params.id;

    if ( ! isValidId(id))
    {
        return res.status(422).json({message: `Malformed thought ID: "${id}"`});
    }

    try
    {
        const deletedThought = await Thought.findByIdAndDelete(id, { new: true });

        const removedFromUser = await User.findByIdAndUpdate(deletedThought?.user, {$pull: { thoughts: id }}, { new: true });

        return res.json({deletedThought, removedFromUser});
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};
