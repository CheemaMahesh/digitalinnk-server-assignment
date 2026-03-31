import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  date: Date;
  name: string;
  price: number;
  currency: string;
}

const ProductItem = new Schema<IProduct>({
  date: { type: Date, default: Date.now },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
});

export default mongoose.model<IProduct>("Product", ProductItem);
