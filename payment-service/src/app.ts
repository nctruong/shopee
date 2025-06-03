import express, { RequestHandler } from 'express'
import {createPaymentRouter} from "./routes/new";
import cookieSession from "cookie-session";
import {json} from "body-parser";
import rateLimit from "express-rate-limit";
import {errorHandler, currentUser} from "@willnguyen/shopee-common";
import mongoose from "mongoose";
import {indexPaymentRouter} from "./routes";
import {showPaymentRouter} from "./routes/show";
import {updatePaymentRouter} from "./routes/update";

const app = express()
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    }) as RequestHandler
);
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1m
    max: 100
})
app.use(limiter)
app.use(currentUser);
app.use(createPaymentRouter)
app.use(indexPaymentRouter)
app.use(showPaymentRouter)
app.use(updatePaymentRouter)

const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
}

export { connectMongoose, app }
