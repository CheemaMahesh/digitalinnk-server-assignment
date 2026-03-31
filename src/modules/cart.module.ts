import mongoose, { Schema, Document } from "mongoose";

export interface CartItem extends Document {
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  quantity: number;
}

const cartItemSchema = new Schema<CartItem>({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  productId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 1 },
});

export default mongoose.model<CartItem>("CartItem", cartItemSchema);
