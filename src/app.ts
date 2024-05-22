import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRouters } from './app/modules/product/product.route';
const app: Application = express();

app.use(express.json());
app.use(cors());


// aplication routes
app.use('/api/products', ProductRouters);

app.get('/', (req: Request, res: Response) => {

  res.send('Running!');
});

export default app;
