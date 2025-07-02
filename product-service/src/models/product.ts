import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current';
import { Inventory } from './inventory';

interface ProductAttrs {
    title: string;
    description?: string;
    price: number;
    quantity: number;
    userId: string;
    version?: number;
}

interface ProductDoc extends mongoose.Document {
    title: string;
    description?: string;
    price: number;
    quantity: number;
    userId: string;
    version: number;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: String,
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        userId: {type: String, required: true},
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
        timestamps: { createdAt: true, updatedAt: false }
    }
);
productSchema.set('versionKey', 'version');
productSchema.plugin(updateIfCurrentPlugin);

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', productSchema);

export {Product, ProductAttrs, ProductDoc};
