import { connection } from "./connection.mjs";
import { app } from "./server.mjs";
import "dotenv/config";

connection.once("open", () => {
    app.listen(parseInt(process.env.SERVER_PORT!), () =>
        console.log(`Listening on port http://localhost:${process.env.SERVER_PORT}`));
});
