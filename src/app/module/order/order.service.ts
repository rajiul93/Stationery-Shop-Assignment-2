import { TProduct } from '../product/product.interface';
import { Product } from '../product/product.schema';
import { IProduct, TOrder } from './order.interface';
import Order from './order.schema';

const findProductDB = async (orderData: TOrder) => {
  const productData = await Product.findById(orderData.product);
  return productData;
};

const createOrderDB = async (orderData: TOrder, productData: IProduct) => {
  const { email, product, quantity } = orderData;
  const productPrice = (productData as TProduct).price;
  const totalPrice = productPrice * orderData.quantity;
  const order: TOrder = await Order.create({
    email,
    product,
    quantity,
    totalPrice,
  });
  return order;
};

const revenueDataFromDB = async () => {
  const productData = await Order.find();
  return productData;
};
export const orderDatabaseControl = {
  findProductDB,
  createOrderDB,
  revenueDataFromDB,
};
