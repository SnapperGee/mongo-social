import { User } from "../build/model/user.mjs";
import { Thought } from "../build/model/thought.mjs";
import { connection } from "../build/connection.mjs";

connection.once("open", async () => {
    try
    {
        console.log("Clearing User collection...");
        await User.deleteMany();
        console.log("Clearing Thought collection...");
        await Thought.deleteMany();
        console.log("Database cleared.\nClosing connection...");
        await connection.close();
    }
    catch(err)
    {
        connection.close();
        throw err;
    }
});
