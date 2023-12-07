import { User } from "../model/user.mjs";
import type { Request, Response } from 'express';

export const usersGetRequest = async (req: Request, res: Response) =>
{
    try
    {
        const users = await User.find();
        res.json(users);
    }
    catch(error)
    {
        console.error(error);
    }
};
