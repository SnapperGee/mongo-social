import { User } from "../model/user.mjs";
import type { Request, Response } from "express";

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
