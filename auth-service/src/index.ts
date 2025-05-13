import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

import { handleErrors } from "./middlewares/handle-errors"

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.use(handleErrors)

app.listen(port, () => {
    console.log(`Server started on port ${port} !`);
})
