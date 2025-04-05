import express from 'express';
import { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory} from '../controllers/categoryController.js';

const router = express.Router();

// All routes in this file are prefixed with api/categories
router.route("/")
  .get(getCategories) // Get all categories
  .post(createCategory); // Create a new category

router.route("/:id")
  .get(getCategoryById) // Get category by ID
  .put(updateCategory) // Update category
  .delete(deleteCategory); // Delete category


export default router;