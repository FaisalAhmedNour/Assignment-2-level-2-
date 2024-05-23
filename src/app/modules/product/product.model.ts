import { Schema, model } from 'mongoose';
import { ProductType, inventoryType, variantType } from './product.interface';

const variantSchema = new Schema<variantType>({
  type: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true },
});

const inventorySchema = new Schema<inventoryType>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<ProductType>({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  tags: { type: [String], required: true, trim: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

export const Products = model<ProductType>('product', productSchema);
