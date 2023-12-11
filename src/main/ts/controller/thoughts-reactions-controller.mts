import { Thought } from "../model/thought.mjs";
import { User } from "../model/user.mjs";
import type { Request, Response } from "express";
import { Types } from "mongoose";
const isValidId = Types.ObjectId.isValid;

export const createReaction = async (req: Request, res: Response) =>
{
    const thoughtId = req.params.thoughtId;
    const { reactionUser, reactionBody } = req.body;

    if ( ! thoughtId)
    {
        return res.status(400).json({message: "Thought ID is required."});
    }

    if ( ! isValidId(thoughtId))
    {
        return res.status(422).json({message: `Malformed thought ID: "${thoughtId}"`});
    }

    if ( ! reactionBody)
    {
        return res.status(400).json({message: "Reaction body is required."});
    }

    try
    {
        if ( ! await Thought.exists({_id: thoughtId}))
        {
            return res.status(404).json({message: "Invalid thought ID."});
        }

        if ( ! await User.exists({_id: reactionUser}))
        {
            return res.status(404).json({message: "Invalid reaction user ID."});
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }

    try
    {
        const newReaction = { reactionBody, user: reactionUser };

        const thoughtWithNewReaction =
            await Thought.findByIdAndUpdate(thoughtId, {$push: {reactions: newReaction}}, {new: true}).select("-__v");

        return res.status(201).json(thoughtWithNewReaction);
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};
