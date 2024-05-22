import { ProductType } from './product.interface';
import { Products } from './product.model';

const createProductIntoDB = async (product: ProductType) => {
  try {
    // console.log('services: ',product);
    const result = await Products.create(product);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getProductsFromDB = async () => {
  try {
    const result = await Products.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getProductByIdFromDB = async (id: string) => {
  try {
    const result = await Products.findById(id).exec();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateProductByIdFromDB = async (
  id: string,
  updateObject: ProductType,
) => {
  try {
    const result = await Products.updateOne(
      { _id: id },
      { $set: updateObject },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductByIdFromDB,
  updateProductByIdFromDB,
};
