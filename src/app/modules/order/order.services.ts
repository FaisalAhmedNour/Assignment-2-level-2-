import { Products } from '../product/product.model';
import { OrderType } from './order.interface';
import { Orders } from './order.model';

const createOrderIntoDB = async (order: OrderType) => {
  try {
    const selectedProduct = await Products.findById(order.productId).exec();
    if (!selectedProduct) {
      return { message: 'No matched product!' };
    }
    if (selectedProduct.inventory.quantity >= order.quantity) {
      const updateField = {
        'inventory.quantity':
          selectedProduct.inventory.quantity - order.quantity,
        'inventory.inStock':
          selectedProduct.inventory.quantity - order.quantity === 0
            ? false
            : true,
      };
      const updateResult = await Products.findOneAndUpdate(
        { _id: order.productId },
        { $set: updateField },
      );
      //   console.log('services: ', updateResult);
      const result = await Orders.create(order);
      return result;
    } else {
      return { message: 'Insufficient quantity available in inventory' };
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrderIntoDB = async (searchEmail : string | undefined) => {
  try {
    const result = await Orders.find(
      searchEmail ? { email: searchEmail } : {},
    ).exec();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getOrderIntoDB,
};
