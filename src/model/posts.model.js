import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "employees"
        }
    },
    {
        timestamps: true
    }
);

export const POSTS = mongoose.model("posts", postsSchema)