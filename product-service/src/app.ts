import express, { RequestHandler } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@willnguyen/shopee-common';
import rateLimit from "express-rate-limit";

import { createProductRouter } from './routes/new';
import { showProductRouter } from './routes/show';
import { indexProductRouter } from './routes/index';
import { updateProductRouter } from './routes/update';
import {showInventoryRouter} from "./routes/show-inventory";

const app = express();
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
app.use((req, res, next) => {
    console.log(`current user: ${JSON.stringify(req.currentUser)}`)
    next()
})

app.use(createProductRouter);
app.use(showInventoryRouter);
app.use(showProductRouter);
app.use(indexProductRouter);
app.use(updateProductRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
