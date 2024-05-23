import express from 'express';
import { OrderContollers } from './order.controllers';

const router = express.Router();

router.post('/', OrderContollers.createOrder);
router.get('/', OrderContollers.getOrders);

export const OrderRouters = router;
