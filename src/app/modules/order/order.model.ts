import { Schema, model } from 'mongoose';
import { OrderType } from './order.interface';

const orderSchema = new Schema<OrderType>({
  email: { type: String, required: true, trim: true },
  productId: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Orders = model<OrderType>('order', orderSchema);
