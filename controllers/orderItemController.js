import asyncHandler from 'express-async-handler';
import {OrderItem} from '../models/associations.js';
import { orderItemSchema } from '../validation/orderItemValidation.js';
import {Op} from 'sequelize';

// @desc    Create a new order item
// @route   POST /api/order-items
// @access  Private
export const createOrderItem = asyncHandler(async (req, res) => {
    const { error } = orderItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { orderId, productId, quantity, price } = req.body;

    try {
        const newOrderItem = await OrderItem.create({
            orderId,
            productId,
            quantity,
            price
        });

        res.status(201).json(newOrderItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get all order items
// @route   GET /api/order-items
// @access  Private
export const getOrderItems = asyncHandler(async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll();
        res.status(200).json(orderItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get a single order item by ID
// @route   GET /api/order-items/:id
// @access  Private
export const getOrderItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const orderItem = await OrderItem.findByPk(id);

        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        res.status(200).json(orderItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Update an order item
// @route   PUT /api/order-items/:id
// @access  Private
export const updateOrderItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { quantity, price } = req.body;

    try {
        const orderItem = await OrderItem.findByPk(id);

        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        if (quantity) orderItem.quantity = quantity;
        if (price) orderItem.price = price;

        await orderItem.save();

        res.status(200).json(orderItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Delete an order item
// @route   DELETE /api/order-items/:id
// @access  Private
export const deleteOrderItem = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const orderItem = await OrderItem.findByPk(id);

        if (!orderItem) {
            return res.status(404).json({ message: 'Order item not found' });
        }

        await orderItem.destroy();

        res.status(204).json({ message: 'Order item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get order items by order ID
// @route   GET /api/order-items/order/:orderId
// @access  Private
export const getOrderItemsByOrderId = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    try {
        const orderItems = await OrderItem.findAll({
            where: {
                orderId: {
                    [Op.eq]: orderId
                }
            }
        });

        if (!orderItems.length) {
            return res.status(404).json({ message: 'No order items found for this order' });
        }

        res.status(200).json(orderItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get order items by product ID
// @route   GET /api/order-items/product/:productId
// @access  Private
export const getOrderItemsByProductId = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    try {
        const orderItems = await OrderItem.findAll({
            where: {
                productId: {
                    [Op.eq]: productId
                }
            }
        });

        if (!orderItems.length) {
            return res.status(404).json({ message: 'No order items found for this product' });
        }

        res.status(200).json(orderItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get order items by user ID
// @route   GET /api/order-items/user/:userId
// @access  Private
export const getOrderItemsByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
        const orderItems = await OrderItem.findAll({
            where: {
                userId: {
                    [Op.eq]: userId
                }
            }
        });

        if (!orderItems.length) {
            return res.status(404).json({ message: 'No order items found for this user' });
        }

        res.status(200).json(orderItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

