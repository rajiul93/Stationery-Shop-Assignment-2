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

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((error: unknown, req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: 'Internal server error some thing wrong',
    error: error instanceof Error ? error.message : 'Unknown error',
  });
});
export default app;
