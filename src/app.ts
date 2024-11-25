import cors from 'cors';
import express, { Request, Response } from 'express';
import { orderRoute } from './app/module/order/order.routers';
import { productRoutes } from './app/module/product/product.router';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoute);
export default app;
