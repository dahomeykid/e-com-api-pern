import express from 'express';
import { createProduct,getProductById, getPaginatedProducts, updateProduct, deleteProduct, getProductsByCategory  } from '../controllers/productController.js';

const router = express.Router();

// All routes in this file are prefixed with api/products
router.route("/") 
  .get(getPaginatedProducts) // Get all products
  .post(createProduct);

router.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct); 

// Get all products
router.get("/categories/:categoryId",getProductsByCategory );

export default router;