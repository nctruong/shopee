import express,  { Request, Response, NextFunction} from 'express';
import { requireAuth, validateRequest } from '@willnguyen/shopee-common';
import {Order} from "../models/order";

const router = express.Router()

router.get('/api/orders/:id', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id);
        res.status(200).send(order);
    }
)

export { router as showOrderRouter }
