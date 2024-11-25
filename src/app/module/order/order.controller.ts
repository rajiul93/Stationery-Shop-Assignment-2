import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TProduct } from '../product/product.interface';
import { IProduct, TOrder } from './order.interface';
import { orderDatabaseControl } from './order.service';
import { orderValidationSchema } from './order.validation';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData: TOrder = req.body;
    const orderDataValidationByZod = orderValidationSchema.parse(orderData);

    const productData = await orderDatabaseControl.findProductDB(
      orderDataValidationByZod,
    );

    if (!productData) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    if ((productData as TProduct)?.quantity <= orderData.quantity) {
      res.status(201).json({
        success: false,
        message: 'maybe quantity are zero or you add many to our stoke',
      });
    } 

    const product: IProduct = productData as unknown as IProduct;

    const newOrder = await orderDatabaseControl.createOrderDB(
      orderData,
      product,
    );

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedError = {
        message: 'Validation failed',
        success: false,
        error: {
          name: 'ValidationError',
          errors: error.errors.reduce(
            (acc: Record<string, unknown>, err) => {
              const path = String(err.path[0]);
              acc[path] = {
                message: err.message,
                name: 'ValidatorError',
                properties: {
                  message: err.message,
                  type: err.code,
                },
                kind: err.code,
                path: path,
                value: req.body.product?.[path],
              };
              return acc;
            },
            {} as Record<string, unknown>,
          ),
        },
        stack: error.stack,
      };

      res.status(400).json(formattedError);
      return;
    }
    next(error);
  }
};

const orderRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const revenue = await orderDatabaseControl.revenueDataFromDB();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: revenue,
    });
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  createOrder,
  orderRevenue,
};
