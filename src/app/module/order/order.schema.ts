import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Order = mongoose.model<TOrder>('Order', orderSchema);

export default Order;
