import { User } from "../build/model/user.mjs";
import { Thought } from "../build/model/thought.mjs";
import { users } from "./users.mjs";
import { thoughts } from "./thoughts.mjs";
import { connection } from "../build/connection.mjs";

connection.once("open", async () => {
    try
    {
        await User.insertMany(users);
        await Thought.insertMany(thoughts);
        await connection.close();
    }
    catch(err)
    {
        connection.close();
        throw err;
    }
});
