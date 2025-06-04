import {Inventory} from "../inventory";

const releaseInventory = async (productId: string, amount: number) => {
    const inventory = await Inventory.findOne({ productId });

    if (!inventory) return;

    inventory.release(amount);
    await inventory.save();
};

export { releaseInventory };
