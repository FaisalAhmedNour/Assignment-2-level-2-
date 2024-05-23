import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRouters } from './app/modules/product/product.route';
import { OrderRouters } from './app/modules/order/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// aplication routes
app.use('/api/products', ProductRouters);
app.use('/api/orders', OrderRouters);

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Running!');
});

export default app;
