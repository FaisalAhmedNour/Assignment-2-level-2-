import { ProductType } from './product.interface';
import { Products } from './product.model';

const createProductIntoDB = async (product: ProductType) => {
  try {
    const result = await Products.create(product);
    return result;
  } catch (error) {
    return { message: 'Something went wrong! Try again later.' };
  }
};

const getProductsFromDB = async (searchTerm: string | undefined) => {
  try {
    const result = await Products.find(searchTerm ? { tags: searchTerm } : {});
    return result;
  } catch (error) {
    return { message: 'Something went wrong! Try again later.' };
  }
};

const getProductByIdFromDB = async (id: string) => {
  try {
    const result = await Products.findById(id).exec();
    return result;
  } catch (error) {
    return { message: 'Something went wrong! Try again later.' };
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
    return { message: 'Something went wrong! Try again later.' };
  }
};

const deleteProductByIdFromDB = async (id: string) => {
  try {
    const result = await Products.deleteOne({ _id: id });
    return result;
  } catch (error) {
    return { message: 'Something went wrong! Try again later.' };
  }
};

export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getProductByIdFromDB,
  updateProductByIdFromDB,
  deleteProductByIdFromDB,
};
