import cors from 'cors';
import express, { Request, Response } from 'express';
import { productRoutes } from './app/module/product/product.router';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/products', productRoutes);
export default app;
