import express,  { Request, Response, NextFunction} from 'express';
import { requireAuth, validateRequest } from '@willnguyen/shopee-common';
import {Payment} from "../models/payment";

const router = express.Router()

router.get('/api/orders/:id', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const payment = await Payment.findById(req.params.id);
        res.status(200).send(payment);
    }
)

export { router as showPaymentRouter };
