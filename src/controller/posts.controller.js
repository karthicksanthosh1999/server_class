import { POSTS } from "../model/posts.model.js";

export const createPosts = async (req, res) => {
    try {

        const { message, userId } = req.body;

        const posts = await POSTS.create({
            message,
            userId
        })

        res.json({
            message: "Post Created Successfully",
            statusCode: 201,
            success: true,
            data: posts
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

export const getAllPosts = async (req, res) => {
    try {
        0
        const posts = await POSTS.aggregate(
            [
                {
                    $lookup: {
                        from: "employees",
                        localField: "userId",
                        foreignField: "_id",
                        as: "userDetails"
                    }
                }
            ]
        );
        res.json({
            message: "Post Get Successfully",
            statusCode: 201,
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(400).json(err);
    }
}