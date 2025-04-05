import asyncHandler from 'express-async-handler';
 import {Category, Product} from '../models/associations.js';
 import { categorySchema, categoryUpdateSchema } from '../validation/categoryValidation.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.findAll();
    res.status(200).json(categories);
});

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        res.status(404).json({ message: 'Category not found' });
    } else {
        res.status(200).json(category);
    }
});

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
    const { error } = categorySchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
    const { error } = categoryUpdateSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { name, description } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        res.status(404).json({ message: 'Category not found' });
    } else {
        category.name = name || category.name;
        category.description = description || category.description;
        await category.save();
        res.status(200).json(category);
    }
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        res.status(404).json({ message: 'Category not found' });
    } else {
        await category.destroy();
        res.status(200).json({ message: 'Category deleted' });
    }
});

// @desc    Get categories with products
// @route   GET /api/categories/products
// @access  Public
export const getCategoriesWithProducts = asyncHandler(async (req, res) => {
    const categories = await Category.findAll({
        include: {
            model: Product,
            attributes: ['id', 'name', 'price'],
        },
    });
    res.status(200).json(categories);
});

