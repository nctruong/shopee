import express,  { Request, Response, NextFunction} from 'express';
import { requireAuth, validateRequest } from '@willnguyen/shopee-common';
import {Payment} from "../models/payment";

const router = express.Router()

router.get('/api/payments', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const payments = await Payment.find()
        res.send(payments);
    }
)

export { router as indexPaymentRouter }
