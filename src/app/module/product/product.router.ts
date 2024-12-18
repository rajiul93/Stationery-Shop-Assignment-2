import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSpecificProducts);
router.post('/', productController.createProduct);
router.put('/:productId', productController.updateSpecificProducts);
router.delete('/:productId', productController.deleteSpecificProducts);

export const productRoutes = router;
