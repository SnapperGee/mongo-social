import { IReaction, reactionSchema } from "./reaction.mjs";
import { Model, Schema, model } from "mongoose";

interface IThought
{
    thoughtText: string;
    user: Schema.Types.ObjectId;
    reactions: IReaction[];
    reactionCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IThoughtMethods
{
    formattedTimeStamp(): string;
}

type ThoughtModel = Model<IThought, {}, IThoughtMethods>;

const thoughtSchema = new Schema<IThought, ThoughtModel, IThoughtMethods>({
    thoughtText: {
        type: String,
        required: true,
        minLength: [1, "Thought text must be at least 1 character."],
        maxLength: [280, "Thought text must be less than 280 characters."]
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    reactions: [reactionSchema]
},
{
    timestamps: true
});

thoughtSchema.methods.formattedTimeStamp = function(): string
{
    return this.createdAt!.toLocaleDateString();
}

thoughtSchema.virtual("reactionCount").get(function(): number
{
    return this.reactions.length;
});

export const User = model<IThought, ThoughtModel>("Thought", thoughtSchema);

export default User;
