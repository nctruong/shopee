import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { handleErrors } from "./middlewares/handle-errors"
import * as mongoose from "mongoose";
import cookieSession from "cookie-session"

const app = express();
app.set('trust proxy', true); // trust ingress
app.use(cookieSession({
    signed: false, // disable encryption bcs we encrypted password already
    secure: true // force ssl
}))
const port = process.env.PORT || 3000;

app.use(json());
app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.use(handleErrors)

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

