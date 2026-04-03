import { USER } from "../model/user.model.js";
import nodeMailer from 'nodemailer';

// Create user
export const createUser = async (req, res) => {
    try {
        const user = await USER.create(req.body)
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

// DELETE USER
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await USER.findByIdAndDelete(id);
        res.json({
            message: "User Delete Successfully",
            statusCode: 200,
            success: true,
            data: user
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

// GET ALL USER
export const getAllUsers = async (_req, res) => {
    try {
        const users = await USER.find();
        res.json({
            message: "User Get All Successfully",
            statusCode: 200,
            success: true,
            data: users
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

// GET SINGLE USER
export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await USER.findById(id);
        res.json({
            message: "User Get Successfully",
            statusCode: 200,
            success: true,
            data: user
        });
    } catch (err) {
        res.status(400).json(err);
    }
}

// UPDATE USER
export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await USER.findByIdAndUpdate(id, req.body)
        res.json({
            message: "User Updated Successfully",
            statusCode: 201,
            success: true
        });
    } catch (err) {
        res.status(400).json(err);
    }
};


export const filterUser = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 5 } = req.body;

        const pageNumber = parseInt(page)
        const pageLimit = parseInt(limit)

        const searchFilter = {
            $or: [
                { fullName: { $regex: search, $options: "i" } },
                { mobile: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }

        const users = await USER.find(searchFilter).skip((pageNumber - 1) * pageLimit).limit(pageLimit).sort({ createAt: -1 });
        const userCount = await USER.countDocuments();

        return res.json(
            {
                statusCode: 200,
                data: users,
                pagination: {
                    pageLimit,
                    pageNumber,
                    userCount
                }
            }
        )




    } catch (error) {
        return res.json(error)
    }
}

export const sendOtp = async (req, res) => {
    try {

        const { email } = req.body

        const transport = nodeMailer.createTransport(
            {
                secure: false,
                service: "gmail",
                auth: {
                    user: process.env.APP_EMAIL,
                    pass: process.env.APP_PASSWORD
                }
            }
        );

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to: email,
            subject: "OTP email for testing",
            text: "Hello this is your OTP 887766"
        }

        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                return res.json({
                    message: "OTP send Successfully",
                    statusCode: 200,
                    success: true,
                    info: info.response
                });
            }
        })


    } catch (err) {
        res.status(400).json(err);
    }
}