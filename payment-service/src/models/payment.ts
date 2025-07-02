import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

enum PaymentStatus {
    created = 'created',
    updated = 'updated',
    deleted = 'deleted',
    waitingPayments = 'waitingPayments',
}

const paymentSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        status: {type: String, required: true, enum: PaymentStatus},
        orderId: String,
        provider: String,
        amount: Number
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true
    }
)

interface PaymentDoc extends mongoose.Document {
    userId: string;
    status: string;
    orderId: number;
    provider: string;
    amount: number;
}

const Payment = mongoose.model<PaymentDoc>('Payment', paymentSchema);

export {Payment};
