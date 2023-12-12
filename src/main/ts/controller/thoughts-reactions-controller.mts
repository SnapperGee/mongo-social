import { Thought } from "../model/thought.mjs";
import { User } from "../model/user.mjs";
import type { Request, Response } from "express";
import { Types } from "mongoose";
const isValidId = Types.ObjectId.isValid;

export const createReaction = async (req: Request, res: Response) =>
{
    const thoughtId = req.params.thoughtId;
    const { userId, reactionBody } = req.body;

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

        if ( ! await User.exists({_id: userId}))
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
        const newReaction = { reactionBody, user: userId };

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

export const deleteReaction = async (req: Request, res: Response) =>
{
    const thoughtId = req.params.thoughtId;
    const reactionId = req.body.reactionId;

    if ( ! thoughtId)
    {
        return res.status(422).json({message: "Thought ID is required."});
    }

    if ( ! reactionId)
    {
        return res.status(422).json({message: "Reaction ID is required."});
    }

    if ( ! isValidId(thoughtId))
    {
        return res.status(422).json({message: `Malformed thought ID: "${thoughtId}"`});
    }

    if ( ! isValidId(reactionId))
    {
        return res.status(422).json({message: `Malformed reaction ID: "${reactionId}"`});
    }

    try
    {
        if ( ! await Thought.exists({_id: thoughtId}))
        {
            return res.status(409).json({message: "Invalid thought ID."});
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }

    try
    {
        const thoughtThatReactionWasDeletedFrom =
            await Thought.findOneAndUpdate(
                {_id: thoughtId},
                { $pull: {reactions: {reactionId: reactionId}} },
                { new: true });

        return res.json(thoughtThatReactionWasDeletedFrom);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};
