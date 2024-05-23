import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import { JoiValidationSchemaForProduct } from './product.validation';
import { UpdateWriteOpResult } from 'mongoose';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const { error, value } =
      JoiValidationSchemaForProduct.validate(productData);

    if (error) {
      res.status(200).json({
        success: true,
        message: 'Product did not created!',
        error: error.details,
      });
    } else {
      const result = await ProductServices.createProductIntoDB(value);
      res.status(200).json({
        success: true,
        message: 'Product created successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create product. Please try again later.',
      error: error,
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
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products. Please try again later.',
      error: error,
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
        message: 'No product found with this id!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Product not found!',
      error: error,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const dataToUpdate = req.body;

    const { error, value } =
      JoiValidationSchemaForProduct.validate(dataToUpdate);

    if (error) {
      res.status(400).json({
        success: false,
        message: 'Something went wrong!',
        error: error.details,
      });
    } else {
      const result: UpdateWriteOpResult | undefined =
        await ProductServices.updateProductByIdFromDB(productId, value);
      if (result && result?.modifiedCount >= 1) {
        res.status(200).json({
          success: true,
          message: 'Product updated successfully!',
          data: value,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Product did not updated!',
          data: null,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update product. Please try again later!',
      error: error,
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductByIdFromDB(productId);
    if (result && result?.deletedCount && result?.deletedCount >= 1) {
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
    res.status(500).json({
      success: false,
      message: 'Product did not deleted!',
      error: error,
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
