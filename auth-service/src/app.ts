import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { errorHandler } from "./middlewares/error-handler"
import cookieSession from "cookie-session"
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.set('trust proxy', true); // trust ingress
app.use(cookieSession({
    signed: false, // disable encryption bcs we encrypted password already
    secure: true // force ssl
}))

app.use(json());
app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// app.use(errorHandler)

export default app;
