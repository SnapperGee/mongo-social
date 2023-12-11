import { Model, Schema } from "mongoose";

export interface IReaction
{
    reactionId?: Schema.Types.ObjectId;
    reactionBody: string;
    user: Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

type ReactionModel = Model<IReaction, {}>;

export const reactionSchema = new Schema<IReaction, ReactionModel>({
    reactionId: {
        type: Schema.Types.ObjectId,
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

reactionSchema.path("_id").select(false);
