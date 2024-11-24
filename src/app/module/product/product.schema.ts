import mongoose, { Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [1, 'Price should be positive value'],
    },
    category: {
      type: String,
      enum: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,  
  }
);

export const Product = mongoose.model('productCollection', productSchema);
