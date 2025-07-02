import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';
import {OrderStatus} from '@willnguyen/shopee-common';

export {OrderStatus};

interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    totalPrice: number;
    orderItems: OrderItem[];
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    totalPrice: number;
    orderItems: OrderItem[];
    version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderItemSchema = new mongoose.Schema<OrderItem>(
    {
        productId: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
    },
    {_id: false}
);
const orderSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true,},
        status: {type: String, required: true, enum: Object.values(OrderStatus), default: OrderStatus.Created},
        expiresAt: {type: mongoose.Schema.Types.Date},
        totalPrice: {type: Number, required: true},
        orderItems: [orderItemSchema]
    },
    {
        toJSON: {
            transform(doc: any, ret: any) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
        timestamps: {createdAt: true, updatedAt: false}
    }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export {Order};
