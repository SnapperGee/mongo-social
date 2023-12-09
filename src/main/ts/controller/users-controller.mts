import { User } from "../model/user.mjs";
import { Thought } from "../model/thought.mjs";
import type { Request, Response } from "express";
import { Types } from "mongoose";
const isValidId = Types.ObjectId.isValid;

export const getAllUsers = async (req: Request, res: Response) =>
{
    try
    {
        const users = await User.find().select("-__v")
            .populate("thoughts", "-__v -user")
            .populate("friends", "-__v");

        res.json(users);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json(error);
    }
};

export const getUserById = async (req: Request, res: Response) =>
{
    try
    {
        const users = await User.findById(req.params.id).select("-__v")
            .populate("thoughts", "-__v -user")
            .populate("friends", "-__v");

        res.json(users);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json(error);
    }
};

export const createUser = async (req: Request, res: Response) =>
{
    const {username, email} = req.body;

    if ( ! username)
    {
        return res.status(400).json({message: "Username is required."});
    }

    if ( ! email)
    {
        return res.status(400).json({message: "Email is required."});
    }

    try
    {
        if (await User.exists({username}))
        {
            return res.status(409).json({message: "Username cannot be used."});
        }

        if (await User.exists({email}))
        {
            return res.status(409).json({message: "Email cannot be used."});
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }

    try
    {
        const newUsers = await User.create({username, email});
        return res.status(201).json(newUsers);
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};

export const updateUser = async (req: Request, res: Response) =>
{
    const id = req.params.id;

    if ( ! id)
    {
        return res.status(400).json({message: "User ID is required."});
    }

    if ( ! await User.exists({_id: id}))
    {
        return res.status(404).json({message: "Invalid User ID."});
    }

    if (req.body.thoughts)
    {
        if ( ! (req.body.thoughts instanceof Array))
        {
            return res.status(422).json({message: "Non array of thought IDs."});
        }

        const invalidThoughtsIdIndexes: readonly number[] = req.body.thoughts.reduce(
            (accumulator: number[], thoughtId: string, index: number) =>
            {
                if ( ! isValidId(thoughtId))
                {
                    accumulator.push(index);
                }

                return accumulator;
            },
            []
        );

        if (invalidThoughtsIdIndexes.length !== 0)
        {
            return res.status(422).json({message: `Malformed thought ID(s): "${invalidThoughtsIdIndexes.map(index => req.body.thoughts[index]).join('", "')}"`});
        }

        try
        {
            if (await Thought.exists({_id: {$nin: req.body.thoughts}}))
            {
                return res.status(404).json({message: "Invalid thought ID(s)."});
            }
        }
        catch (error)
        {
            console.error(error);
            return res.status(500).json(error);
        }
    }

    if (req.body.friends)
    {
        if ( ! (req.body.friends instanceof Array))
        {
            return res.status(422).json({message: "Non array of friend IDs."});
        }

        const invalidFriendsIdIndexes: readonly number[] = req.body.friends.reduce(
            (accumulator: number[], friendId: string, index: number) =>
            {
                if ( ! isValidId(friendId))
                {
                    accumulator.push(index);
                }

                return accumulator;
            },
            []
        );

        if (invalidFriendsIdIndexes.length !== 0)
        {
            return res.status(422).json({message: `Malformed friend ID(s): "${invalidFriendsIdIndexes.map(index => req.body.friends[index]).join('", "')}"`});
        }

        try
        {
            if (await User.exists({_id: {$nin: req.body.friends}}))
            {
                return res.status(404).json({message: "Invalid friend ID(s)."});
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
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        res.json(updatedUser);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).json(error);
    }
};
