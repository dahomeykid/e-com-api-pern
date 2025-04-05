import express from 'express';
import {Category} from './models/category.js';

const router = express.Router();

// Create a new category
router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

export default router;