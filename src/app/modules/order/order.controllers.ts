import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import { OrderResultType } from './order.interface';
import Joi from 'joi';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result: OrderResultType | undefined =
      await OrderServices.createOrderIntoDB(orderData);
    if (result?.message) {
      res.status(200).json({
        success: false,
        message: result?.message,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order. Please try again later.',
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const searchEmail: string | undefined = req.query.email as string;
    const result = await OrderServices.getOrderIntoDB(searchEmail);
    res.status(200).json({
      success: result?.length === 0 && searchEmail ? false : true,
      message:
        result?.length === 0
          ? searchEmail
            ? 'Order not found'
            : 'No order found'
          : searchEmail
            ? `Orders fetched successfully for user email!`
            : 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order. Please try again later.',
      error: error,
    });
  }
};

export const OrderContollers = {
  createOrder,
  getOrders,
};
