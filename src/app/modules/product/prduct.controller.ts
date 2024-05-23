import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.createProductIntoDB(productData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    console.error('create Error: ', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product. Please try again later.',
      data: null,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm: string | undefined = req.query.searchTerm as string;
    const result = await ProductServices.getProductsFromDB(searchTerm);
    res.status(200).json({
      success: result?.length === 0 && searchTerm ? false : true,
      message:
        result?.length === 0
          ? searchTerm
            ? 'Product not found!'
            : 'No product found!'
          : searchTerm
            ? `Products matching search term ${searchTerm} fetched successfully!`
            : 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products. Please try again later.',
      data: null,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getProductByIdFromDB(productId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to fetch products. Please try again later!',
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Product not found!',
      data: null,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const dataToUpdate = req.body;
    const result = await ProductServices.updateProductByIdFromDB(
      productId,
      dataToUpdate,
    );
    if (result && result?.modifiedCount >= 1) {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully!',
        data: dataToUpdate,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Product did not updated!',
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product. Please try again later!',
      data: null,
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductByIdFromDB(productId);
    // console.log(result)
    if (result && result?.deletedCount >= 1) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Product did not deleted!',
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Product did not deleted!',
      data: null,
    });
  }
};

export const ProductContollers = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
