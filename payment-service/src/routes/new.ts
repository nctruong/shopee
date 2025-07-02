import express, {Request, Response, NextFunction} from 'express';
import {OrderStatus, requireAuth, validateRequest} from '@willnguyen/shopee-common';
import {Payment} from '../models/payment'
import {stripe} from "../stripe";
import {kafkaClient} from "../lib/kafka-wrapper";
import {PaymentCreatedPublisher} from "../events/publishers/payment-created-publisher";

const router = express.Router()

enum PaymentStatus {
    created = 'created',
    updated = 'updated',
    deleted = 'deleted',
    waitingPayments = 'waitingPayments',
}

router.post('/api/payments', requireAuth, validateRequest,
    async (req: Request, res: Response) => {
        const {userId, orderId, provider, amount, token} = req.body;
        const status = PaymentStatus.created;

        const charge = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
            // return_url: 'https://shopee.dev/payments'
        });

        const payment = new Payment({userId, orderId, provider, amount, status, stripeId: charge.id});
        await payment.save();
        new PaymentCreatedPublisher(kafkaClient).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId,
        });

        res.send(payment)
    }
)

export {router as createPaymentRouter};
