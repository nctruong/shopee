import express,  { Request, Response, NextFunction} from 'express';
import { requireAuth, validateRequest } from '@willnguyen/shopee-common';
import {Order} from "../models/order";

const router = express.Router()

router.put('/api/orders/:id', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.id);

        order?.set(req.body);
        order?.save()

        res.status(200).json(order);
    }
)

export { router as updateOrderRouter }
