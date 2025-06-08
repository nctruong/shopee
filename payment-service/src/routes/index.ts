import express,  { Request, Response, NextFunction} from 'express';
import { requireAuth, validateRequest } from '@willnguyen/shopee-common';
import {Payment} from "../models/payment";

const router = express.Router()

router.get('/api/payments', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const page = parseInt(<string>req.query.page) || 1;
        const pageSize = parseInt(<string>req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;
        const payments = await Payment.find()
            .skip(skip)
            .limit(pageSize)
            .sort({createdAt: -1})
        const total = await Payment.countDocuments(payments);
        res.send({data: payments, meta: {total, page, pageSize}});
    }
)

export { router as indexPaymentRouter }
