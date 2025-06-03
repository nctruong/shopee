import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';

enum OrderStatus {
    created = 'created',
    updated = 'updated',
    deleted = 'deleted',
    waitingPayments = 'waitingPayments',
}

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: OrderStatus,
        },
        products: {
            type: Array,
            required: true,
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
)

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: string;
    products: Array<string>
}

const Order = mongoose.model<OrderDoc>('Order', orderSchema);

export { Order };
