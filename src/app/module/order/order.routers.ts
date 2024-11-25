import express from 'express';
import { orderController } from './order.controller';

const route = express.Router();

route.post('/', orderController.createOrder);
route.get('/revenue', orderController.orderRevenue);

export const orderRoute = route;
