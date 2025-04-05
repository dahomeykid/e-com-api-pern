import express from 'express';
import { getProducts, createProduct  } from '../controllers/productController.js';

const router = express.Router();

// All routes in this file are prefixed with api/products
router.route("/") 
  .get(getProducts) // Get all products
  .post(createProduct);

router.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct); 

// Get all products
router.get("/categories/:categoryId",getProductsByCategory );

export default router;