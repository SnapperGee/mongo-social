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
