import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/user");
        console.log("SERVER IS RUNNING SUCCESSFULLY")
    } catch (error) {
        console.log(error)
    }
}