import express, {Request, Response, NextFunction} from 'express';
import {requireAuth, validateRequest} from '@willnguyen/shopee-common';
import {Order} from "../models/order";

const router = express.Router()

router.get('/api/orders', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const page = parseInt(<string>req.query.page) || 1;
        const pageSize = parseInt(<string>req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;
        const orders = await Order.find()
            .skip(skip)
            .limit(pageSize)
            .sort({createdAt: -1})
        const total = await Order.countDocuments(orders);
        console.log(orders)
        res.send({data: orders, meta: {total, page, pageSize}});
    }
)

export {router as indexOrderRouter}
