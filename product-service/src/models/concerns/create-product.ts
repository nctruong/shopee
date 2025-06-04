import {Product, ProductAttrs, ProductDoc} from '../product'
import { Inventory } from '../inventory'
import { reserveInventory } from './reserve-inventory'
import { releaseInventory } from './release-inventory'
import mongoose from "mongoose";

const createProduct = async (attrs: ProductAttrs): Promise<ProductDoc> => {
    const product = Product.build(attrs);
    const inventory = new Inventory({ productId: product.id, quantity: attrs.quantity, reserved: 0 });

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await product.save()
        await inventory.save()
        await session.commitTransaction();
    } catch (e) {
        await session.abortTransaction()
        throw e
    } finally {
        await session.endSession()
    }
    return product
}

export { createProduct };
