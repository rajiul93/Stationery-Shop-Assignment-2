import { TPriceQuantity, TProduct } from './product.interface';
import { Product } from './product.schema';

const createProductDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};
const getAllProductDB = async () => {
  const result = await Product.find();
  return result;
};
const getSpecificProductFormDB = async (productId: string) => {
  const result = await Product.find({ _id: productId });
  return result;
};
const updateSpecificProductFormDB = async (
  productId: string,
  updateForData: TPriceQuantity,
) => {
  const filter = { _id: productId };
  const { price, quantity } = updateForData;
  const update = { price, quantity };
  const result = await Product.findOneAndUpdate(filter, update, {
    new: true,
  });
  return result;
};

export const databaseControl = {
  createProductDB,
  getAllProductDB,
  getSpecificProductFormDB,
  updateSpecificProductFormDB,
};
