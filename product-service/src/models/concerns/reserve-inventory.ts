import { Inventory } from '../inventory';
import {Product} from "../product";

const reserveInventory = async (productId: string, amount: number) => {
    const product = Product.findById(productId);
    if (!product) throw new Error("Product not found");

    let inventory = await Inventory.findOne({ productId });

    if (!inventory) {
        inventory = new Inventory(productId, amount);
        await inventory.save();
    }

    inventory.reserve(amount);
    await inventory.save();
};

export { reserveInventory };
