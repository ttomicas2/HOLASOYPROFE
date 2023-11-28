import mongoose from "mongoose";
export const db = async () => {
    try {
        mongoose.connect('mongodb://localhost/heladera-app');
        console.log("db is connnected");
    } catch (error) {
        console.log(error);
    }
} 