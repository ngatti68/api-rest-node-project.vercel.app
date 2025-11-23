import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.middlewares.js'
import {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct    
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', authenticate, getAllProducts);
router.get('/:id', authenticate, getProductById);
router.get('/category/:category', authenticate, getProductsByCategory);
router.post('/create', authenticate, authorize(['admin']), createProduct);
router.put('/:id', authenticate, authorize(['admin']), updateProduct);
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct);

export default router;