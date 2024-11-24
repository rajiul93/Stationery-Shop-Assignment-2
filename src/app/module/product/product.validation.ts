import { z } from 'zod';

export const productSchemaValidation = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(30, { message: 'Name must not exceed 30 characters' }),

  brand: z.string().min(1, { message: 'Brand is required' }),

  price: z
    .number()
    .min(1, { message: 'Price should be a positive value' })
    .refine((value) => value >= 1, {
      message: 'Price must be a positive number',
    }),

  category: z.enum(
    ['Writing', 'Office Supplies', 'Art Supplies', 'Educational', 'Technology'],
    { message: 'Invalid category' },
  ),

  description: z.string().min(1, { message: 'Description is required' }),

  quantity: z
    .number()
    .min(1, { message: 'Quantity cannot be negative' })
    .refine((value) => value >= 1, {
      message: 'Quantity must be a non-negative number',
    }),

  inStock: z.boolean().refine((value) => typeof value === 'boolean', {
    message: 'InStock must be a boolean value',
  }),

  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const productUpdateSchemaValidation = z.object({
  price: z
    .number()
    .min(1, { message: 'Price should be a positive value' })
    .refine((value) => value >= 1, {
      message: 'Price must be a positive number',
    }),
  quantity: z
    .number()
    .min(1, { message: 'Quantity cannot be negative' })
    .refine((value) => value >= 1, {
      message: 'Quantity must be a non-negative number',
    }),
  updated_at: z.date().optional(),
});
