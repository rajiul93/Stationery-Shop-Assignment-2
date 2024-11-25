import { ObjectId } from 'mongoose';

export type TOrder = {
  email: string;
  product: string;
  quantity: number;
  totalPrice?: number;
};

export type IProduct = {
  _id: ObjectId;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  created_at: Date;
  updated_at: Date;
  __v: number;
};
