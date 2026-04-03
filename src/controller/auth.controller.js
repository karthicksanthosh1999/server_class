import { USER } from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (req, res) => {
    try {

        const { fullName, email, mobile, password } = req.body;
        const existingUser = await USER.findOne({ email, mobile });
        if (existingUser) {
            return res.json({
                message: "User Already Exist",
                statusCode: 200,
                success: true
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await USER.create(
            {
                fullName,
                email,
                mobile,
                password: hashedPassword
            }
        )

        res.json({
            message: "User Created Successfully",
            statusCode: 201,
            success: true,
            data: user
        });
    } catch (err) {
        res.status(400).json(err);
    }
};

// User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await USER.findOne({ email });
        if (!existingUser) {
            return res.json({
                message: "User Not Exist",
                statusCode: 400,
                success: false
            })
        }

        const isMatch = await bcrypt.compare(password, existingUser?.password);
        if (!isMatch) {
            return res.json({
                message: "Invalid User",
                statusCode: 400,
                success: false
            })
        }

        const token = jwt.sign(
            {
                userId: existingUser?.id,
                email: existingUser?.email,
                mobile: existingUser?.mobile
            },
            "JWT-KEY",
            {
                expiresIn: "1d"
            }
        )


        res.cookie("token", token, {
            secure: true,
            httpOnly: true,
        })


        return res.json({
            message: "User Login Successfully",
            statusCode: 200,
            success: true
        })

    } catch (err) {
        res.status(400).json(err);
    }

}

export const logout = async (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "User Logout Successfully",
        statusCode: 200
    })
}