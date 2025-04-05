import asyncHandler from 'express-async-handler';
import { Category, Product } from '../models/associations.js';
import { productSchema, productUpdateSchema } from '../validation/productValidation.js';
import { Op } from 'sequelize';

// @desc    Get products by category
// @route   GET /api/products/categories/:categoryId
// @access  Public
export const getProductsByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const products = await Product.findAll({
        where: { categoryId },
    });
    res.status(200).json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    } else {
        res.status(200).json(product);
    }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { name, image, brand, reference, description, price, stock } = req.body;
    const product = await Product.create({ name, image, brand, reference, description, price, stock });
    res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
    const { error } = productUpdateSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { name, image, brand, reference, description, price, stock } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    } else {
        product.name = name || product.name;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.reference = reference || product.reference;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        await product.save();
        res.status(200).json(product);
    }
});
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    } else {
        await product.destroy();
        res.status(204).json({ message: 'Product deleted' });
    }
});

// @desc    Get all products with categories
// @route   GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.findAll({
        include: {
            model: Category,
            attributes: ['id', 'name'],
        },
    });
    res.status(200).json(products);
});

// @desc    Get all products with categories and pagination
// @route   GET /api/products/paginated
// @access  Public
export const getPaginatedProducts = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page number
    const limit = parseInt(req.query.limit) || 10; // Number of products per page
    const offset = (page - 1) * limit; // Calculate offset for pagination

    const { count, rows } = await Product.findAndCountAll({
        include: {
            model: Category,
            attributes: ['id', 'name'],
        },
        limit,
        offset,
    });

    res.status(200).json({
        totalProducts: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        products: rows,
    });
});


// @desc    Search products by name
// @route   GET /api/products/search
// @access  Public
export const searchProducts = asyncHandler(async (req, res) => {
    const { query } = req.query;
    const products = await Product.findAll({
        where: {
            name: {
                [Op.iLike]: `%${query}%`,
            },
        },
        include: {
            model: Category,
            attributes: ['id', 'name'],
        },
    });
    res.status(200).json(products);
});

// @desc    Filter products by price range
// @route   GET /api/products/filter
// @access  Public
export const filterProducts = asyncHandler(async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    const products = await Product.findAll({
        where: {
            price: {
                [Op.between]: [minPrice, maxPrice],
            },
        },
        include: {
            model: Category,
            attributes: ['id', 'name'],
        },
    });
    res.status(200).json(products);
});

// @desc    Sort products by price or name
// @route   GET /api/products/sort
// @access  Public
export const sortProducts = asyncHandler(async (req, res) => {
    const { sortBy } = req.query; // 'price' or 'name'
    const products = await Product.findAll({
        include: {
            model: Category,
            attributes: ['id', 'name'],
        },
        order: [[sortBy, 'ASC']], // Sort by the specified field in ascending order
    });
    res.status(200).json(products);
});

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id, {
        include: {
            model: Review,
            attributes: ['id', 'rating', 'comment'],
            include: {
                model: User,
                attributes: ['id', 'name'],
            },
        },
    });
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    } else {
        res.status(200).json(product.Reviews);
    }
});

// @desc    Add a review to a product
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
    } else {
        const review = await Review.create({
            rating,
            comment,
            userId: req.user.id,
            productId: product.id,
        });
        res.status(201).json(review);
    }
});

// @desc    Update a review
// @route   PUT /api/products/:id/reviews/:reviewId
// @access  Private
export const updateProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const review = await Review.findByPk(req.params.reviewId);
    if (!review) {
        res.status(404).json({ message: 'Review not found' });
    } else {
        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();
        res.status(200).json(review);
    }
});