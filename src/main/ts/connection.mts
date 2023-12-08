import {connect, connection} from "mongoose";
import "dotenv/config";

connect(`mongodb://localhost:${process.env.DB_PORT}/mongo-social`)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));;

export {connection};

export default connection;
