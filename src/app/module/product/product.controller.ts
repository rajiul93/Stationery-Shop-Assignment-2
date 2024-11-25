import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { TPriceQuantity, TProduct } from './product.interface';
import { databaseControl } from './product.services';
import {
  productSchemaValidation,
  productUpdateSchemaValidation,
} from './product.validation';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData: TProduct = req.body;
    const productValidationByZod = productSchemaValidation.parse(productData);

    const result = await databaseControl.createProductDB(
      productValidationByZod,
    );

    res.status(200).send({
      success: true,
      message: 'new product create successfully',
      data: result,
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

      res.status(400).send(formattedError);
      return;
    }
    res.status(500).send({
      success: false,
      message: 'Internal server issue check your internet connection',
      error: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await databaseControl.getAllProductDB();

    res.status(200).send({
      success: true,
      message: 'new product create successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server issue check your internet connection',
      error: error,
    });
  }
};
const getSpecificProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId: string = req.params.productId;
    const result = await databaseControl.getSpecificProductFormDB(productId);

    res.status(200).send({
      success: true,
      message: 'new product create successfully',
      data: result ? result : {},
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server issue check your internet connection',
      error: error,
    });
  }
};

const updateSpecificProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId: string = req.params.productId;
    const updateForData: TPriceQuantity = req.body;
    const updateDataValidationByZod =
      productUpdateSchemaValidation.parse(updateForData);
    const result = await databaseControl.updateSpecificProductFormDB(
      productId,
      updateDataValidationByZod,
    );
    res.status(200).send({
      success: true,
      message: 'Product updated successfully',
      data: result,
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

      res.status(400).send(formattedError);
      return;
    }
    res.status(500).send({
      success: false,
      message: 'Internal server issue check your internet connection',
      error: error,
    });
  }
};

const deleteSpecificProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productId: string = req.params.productId;
    const result = await databaseControl.deleteSpecificProductFormDB(productId);

    if (result.deletedCount === 0) {
      res.status(404).send({
        success: true,
        message: 'Product not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Product deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal server issue. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSpecificProducts,
  updateSpecificProducts,
  deleteSpecificProducts,
};
