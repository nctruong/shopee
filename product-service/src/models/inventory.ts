import mongoose from 'mongoose';

interface InventoryAttrs {
    productId: string;
    quantity: number;
    reserved?: number;
}

interface InventoryDoc extends mongoose.Document {
    productId: string;
    quantity: number;
    reserved: number;

    available(): number;
    reserve(amount: number): void;
    release(amount: number): void;
    restock(amount: number): void;
}

interface InventoryModel extends mongoose.Model<InventoryDoc> {
    build(attrs: InventoryAttrs): InventoryDoc;
}

const inventorySchema = new mongoose.Schema(
    {
        productId: { type: String, required: true, unique: true },
        quantity: { type: Number, required: true, min: 0 },
        reserved: { type: Number, default: 0, min: 0 }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

// ====== Inventory Methods ======

inventorySchema.methods.available = function () {
    return this.quantity - this.reserved;
};

inventorySchema.methods.reserve = function (amount: number) {
    if (this.available() < amount) {
        throw new Error(`Not enough inventory to reserve. Available: ${this.available()}, requested: ${amount}`);
    }
    this.reserved += amount;
};

inventorySchema.methods.release = function (amount: number) {
    this.reserved = Math.max(this.reserved - amount, 0);
};

inventorySchema.methods.restock = function (amount: number) {
    this.quantity += amount;
};

// ====== Static Builder ======
inventorySchema.statics.build = (attrs: InventoryAttrs) => {
    return new Inventory(attrs);
};

const Inventory = mongoose.model<InventoryDoc, InventoryModel>('Inventory', inventorySchema);
export { Inventory };
