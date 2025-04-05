import asyncHandler from 'express-async-handler';
import { Cart, CartItem } from '../models/associations.js';
import { cartItemSchema } from '../validation/cartItemValidation';
//import { Op } from 'sequelize';

// @desc    Get all cart items by cart ID
// @route   GET /api/cart/:cartId/items
// @access  Private
export const getCartItemsByCartId = asyncHandler(async (req, res) => {
    const { cartId } = req.params;
    try {
        const cartItems = await CartItem.findAll({ where: { cartId } });
        if (!cartItems.length) {
            return res.status(404).json({ message: 'No items found in this cart' });
        }
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a new item to the cart
// @route   POST /api/cart/:cartId/items
// @access  Private
export const addCartItem = asyncHandler(async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    // Validate request body
    const { error } = cartItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Check if the cart exists
        const cart = await Cart.findByPk(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Check if the item already exists in the cart
        const existingItem = await CartItem.findOne({
            where: {
                cartId,
                productId,
            },
        });

        if (existingItem) {
            // Update quantity if item already exists
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json(existingItem);
        }

        // Create a new cart item
        const newCartItem = await CartItem.create({
            cartId,
            productId,
            quantity,
        });

        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update an item in the cart
// @route   PUT /api/cart/:cartId/items/:itemId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
    const { cartId, itemId } = req.params;
    const { quantity } = req.body;

    // Validate request body
    const { error } = cartItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Check if the cart item exists
        const cartItem = await CartItem.findOne({
            where: {
                id: itemId,
                cartId,
            },
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Update the quantity
        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Remove an item from the cart
// @route   DELETE /api/cart/:cartId/items/:itemId
// @access  Private
export const removeCartItem = asyncHandler(async (req, res) => {
    const { cartId, itemId } = req.params;

    try {
        // Check if the cart item exists
        const cartItem = await CartItem.findOne({
            where: {
                id: itemId,
                cartId,
            },
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Delete the cart item
        await cartItem.destroy();

        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Clear all items from the cart
// @route   DELETE /api/cart/:cartId/items
// @access  Private
export const clearCartItems = asyncHandler(async (req, res) => {
    const { cartId } = req.params;

    try {
        // Check if the cart exists
        const cart = await Cart.findByPk(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Delete all items in the cart
        await CartItem.destroy({
            where: {
                cartId,
            },
        });

        res.status(200).json({ message: 'All items removed from the cart' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get cart item count
// @route   GET /api/cart/:cartId/items/count
// @access  Private
export const getCartItemCount = asyncHandler(async (req, res) => {
    const { cartId } = req.params;

    try {
        // Check if the cart exists
        const cart = await Cart.findByPk(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Count items in the cart
        const count = await CartItem.count({
            where: {
                cartId,
            },
        });

        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});