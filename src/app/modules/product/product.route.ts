import express from 'express';
import { ProductContollers } from './prduct.controller';

const router = express.Router();

router.post('/', ProductContollers.createProduct);
router.get('/', ProductContollers.getProducts);
router.get('/:productId', ProductContollers.getProductById);
router.put('/:productId', ProductContollers.updateProductById);

export const ProductRouters = router;
