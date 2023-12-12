import { User } from "../model/user.mjs";
import type { Request, Response } from "express";
import { Types } from "mongoose";
const isValidId = Types.ObjectId.isValid;

export const addFriendToUser = async (req: Request, res: Response) =>
{
    const userId = req.params.userId;

    if ( ! isValidId(userId))
    {
        return res.status(422).json({message: `Malformed user ID: "${userId}"`});
    }

    const friendId = req.params.friendId;

    if ( ! isValidId(friendId))
    {
        return res.status(422).json({message: `Malformed friend user ID: "${friendId}"`});
    }

    try
    {
        if ( ! await User.exists({_id: {$in: [userId, friendId]}}))
        {
            return res.status(409).json({message: "A passed ID cannot be used."});
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }

    try
    {
        const updatedSourceUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: {friends: friendId} },
            { new: true }
        )
        .select("-__v");

        const updatedTargetUser = await User.findByIdAndUpdate(
            friendId,
            { $addToSet: {friends: userId} },
            { new: true }
        )
        .select("-__v");

        return res.json({sourceUser: updatedSourceUser, targetUser: updatedTargetUser});
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
}

export const deleteFriendFromUser = async (req: Request, res: Response) =>
{
    const userId = req.params.userId;

    if ( ! isValidId(userId))
    {
        return res.status(422).json({message: `Malformed user ID: "${userId}"`});
    }

    const friendId = req.params.friendId;

    if ( ! isValidId(friendId))
    {
        return res.status(422).json({message: `Malformed friend user ID: "${friendId}"`});
    }

    try
    {
        if ( ! await User.exists({_id: {$in: [userId, friendId]}}))
        {
            return res.status(409).json({message: "A passed ID cannot be used."});
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }

    try
    {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: {friends: friendId} },
            { new: true }
        )
        .select("-__v");

        return res.json(updatedUser);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
}
