import express,  { Request, Response, NextFunction} from 'express';
import {OrderStatus, requireAuth, validateRequest} from '@willnguyen/shopee-common';
import {Payment} from '../models/payment'

const router = express.Router()
enum PaymentStatus {
        created = 'created',
        updated = 'updated',
        deleted = 'deleted',
        waitingPayments = 'waitingPayments',
}
router.post('/api/payments', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const { userId, orderId, provider, amount } = req.body;
        const status = PaymentStatus.created;
        const payment = new Payment({ userId, orderId, provider, amount, status });
        await payment.save();
        res.send(payment)
    }
)

export { router as createPaymentRouter };
