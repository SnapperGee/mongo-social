import { Thought } from "./thought.mjs";
import { Model, Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

interface IUser
{
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}

type UserModel = Model<IUser, {}>;

const userSchema = new Schema<IUser, UserModel>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: (email: string) => isEmail(email),
            message: (props: any) => `${props.value} is not a valid email address.`
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: Thought
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

export const User = model<IUser, UserModel>("User", userSchema);

export default User;
