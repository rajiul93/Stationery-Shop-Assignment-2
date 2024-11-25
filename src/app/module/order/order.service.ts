import { TProduct } from '../product/product.interface';
import { Product } from '../product/product.schema';
import { IProduct, TOrder } from './order.interface';
import Order from './order.schema';

const findProductDB = async (productId: string) => {
  const productData = await Product.findById(productId);
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

  const quantityToReduce = { quantity: productData.quantity - quantity };
  const filter = { _id: product };
  await Product.findOneAndUpdate(filter, quantityToReduce, {
    new: true,
  });

  const result = await findProductDB(product);

  if (result?.quantity === 0) {
    await Product.findOneAndUpdate(
      filter,
      { inStock: false },
      {
        new: true,
      },
    );
  }

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
