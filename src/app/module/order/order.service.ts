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

  const newQuantityUpdate = { quantity };
  const filter = { _id: product };
  await Product.findOneAndUpdate(filter, newQuantityUpdate, {
    new: true,
  });
  
  return order;
};

const revenueDataFromDB = async () => {
  const productData = await Order.aggregate([
    {
      $project: {
        revenue: { $sum: '$totalPrice' },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$revenue' },
      },
    },
    {
      $project: { totalRevenue: 1, _id: 0 },
    },
  ]);
  return productData;
};

export const orderDatabaseControl = {
  findProductDB,
  createOrderDB,
  revenueDataFromDB,
};
