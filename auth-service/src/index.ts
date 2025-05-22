import mongoose from "mongoose";

import app from "./app";
const port = process.env.PORT || 3000;
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_SECRET is required");
    }
    try {
        await mongoose.connect('mongodb://auth-mongoose-service:27017/auth');
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }

    app.listen(port, () => {
        console.log(`Server started on port ${port} !`);
    })
}

start()

