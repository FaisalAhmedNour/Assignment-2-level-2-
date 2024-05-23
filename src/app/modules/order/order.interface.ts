import { Document } from "mongoose";

export type OrderType = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export interface OrderDocument extends Document {
  message?: string;
}

export type OrderResultWithMessageType = {
  message?: string;
};

export type OrderResultType = OrderDocument | OrderResultWithMessageType;