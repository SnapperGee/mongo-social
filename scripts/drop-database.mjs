import { connection } from "../build/connection.mjs";

connection.once("open", async () => {
    try
    {
        await connection.dropDatabase();
        console.log("Database dropped.\nClosing connection...");
        await connection.close();
    }
    catch(err)
    {
        connection.close();
        throw err;
    }
});
