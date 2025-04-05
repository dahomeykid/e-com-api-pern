import express from 'express';
import {Product} from './models/product.js';

const router = express.Router();

// Create product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

export default router;