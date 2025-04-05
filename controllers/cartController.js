import asyncHandler from 'express-async-handler';
import {Cart} from '../models/associations.js';

// @desc    Get cart by user ID
// @route   GET /api/cart/:userId
// @access  Private
export const getCartByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new cart
// @route   POST /api/cart
// @access  Private
export const createCart = asyncHandler(async (req, res) => {
    const { userId, totalPrice, totalQuantity } = req.body;
    try {
        const newCart = await Cart.create({ userId, totalPrice, totalQuantity });
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update cart by user ID
// @route   PUT /api/cart/:userId
// @access  Private
export const updateCart = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { totalPrice, totalQuantity } = req.body;
    try {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.totalPrice = totalPrice;
        cart.totalQuantity = totalQuantity;
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete cart by user ID
// @route   DELETE /api/cart/:userId
// @access  Private
export const deleteCart = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        await cart.destroy();
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Clear cart by user ID
// @route   DELETE /api/cart/clear/:userId
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        await cart.destroy();
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all carts
// @route   GET /api/cart
// @access  Private
export const getAllCarts = asyncHandler(async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get cart count
// @route   GET /api/cart/count
// @access  Private
export const getCartCount = asyncHandler(async (req, res) => {
    try {
        const count = await Cart.count();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get cart total price by user ID
// @route   GET /api/cart/total-price/:userId
// @access  Private
export const getCartTotalPrice = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ totalPrice: cart.totalPrice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});