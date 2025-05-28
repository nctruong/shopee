import express, {NextFunction, Request, Response} from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler } from "@willnguyen/shopee-common"
import cookieSession from "cookie-session"

const app = express();
app.set('trust proxy', true); // trust ingress
app.use(cookieSession({
    signed: false, // disable encryption bcs we encrypted password already
    secure: process.env.NODE_ENV !== 'test' // force ssl
}))

app.use(json());
app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.use(errorHandler)

export default app;
