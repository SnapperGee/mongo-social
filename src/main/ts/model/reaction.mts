import { Model, Schema } from "mongoose";

export interface IReaction
{
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    user: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IReactionMethods
{

}

type ReactionModel = Model<IReaction, {}, IReactionMethods>;

export const reactionSchema = new Schema<IReaction, ReactionModel, IReactionMethods>({
    reactionId: {
        alias: "_id"
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: [280, "Reaction body must be less than 280 characters."]
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},
{
    timestamps: true
});
