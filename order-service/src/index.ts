import express, { RequestHandler } from 'express'
import {createOrderRouter} from "./routes/new";
import cookieSession from "cookie-session";
import {json} from "body-parser";
import rateLimit from "express-rate-limit";
import {errorHandler, currentUser} from "@willnguyen/shopee-common";

const app = express()
const port = process.env.PORT || 3000
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    }) as RequestHandler
);
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1m
    max: 100
})
app.use(limiter)
app.use(currentUser);
app.use(createOrderRouter)

app.listen(port, () => {
    console.log(`Order Service is listening on port ${port}`)
})
