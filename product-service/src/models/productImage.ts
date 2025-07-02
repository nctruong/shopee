import mongoose, {Schema} from "mongoose";

export interface ProductImageDoc extends Document {
    productId: string;
    imageUrl: string;
    isMain: boolean;
}

const productImageSchema = new Schema<ProductImageDoc>({
    productId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isMain: { type: Boolean, default: false },
});

export const ProductImage = mongoose.model<ProductImageDoc>('ProductImage', productImageSchema);
