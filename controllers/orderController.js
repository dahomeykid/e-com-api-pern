import asyncHandler from 'express-async-handler';
import { Order } from '../models/associations.js';
import { orderSchema, orderUpdateSchema } from '../validation/orderValidation.js';
import { Op } from 'sequelize';


// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.findAll();
    res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Admin
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
        res.status(404).json({ message: 'Order not found' });
    } else {
        res.status(200).json(order);
    }
});

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private/Admin
export const createOrder = asyncHandler(async (req, res) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { userId, cartId, addressId, paymentId, status } = req.body;
    const order = await Order.create({ userId, cartId, addressId, paymentId, status });
    res.status(201).json(order);
}); 

// @desc    Update an order
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrder = asyncHandler(async (req, res) => {
    const { error } = orderUpdateSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    const { userId, cartId, addressId, paymentId, status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) {
        res.status(404).json({ message: 'Order not found' });
    } else {
        order.userId = userId || order.userId;
        order.cartId = cartId || order.cartId;
        order.addressId = addressId || order.addressId;
        order.paymentId = paymentId || order.paymentId;
        order.status = status || order.status;
        await order.save();
        res.status(200).json(order);
    }
});

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
        res.status(404).json({ message: 'Order not found' });
    } else {
        await order.destroy();
        res.status(204).json({ message: 'Order deleted' });
    }
});

// @desc    Get orders by user ID
// @route   GET /api/orders/user/:userId
// @access  Private/Admin
export const getOrdersByUserId = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({
        where: {
            userId: req.params.userId
        }
    });
    if (!orders) {
        res.status(404).json({ message: 'No orders found for this user' });
    } else {
        res.status(200).json(orders);
    }
});

// @desc    Get orders by date range
// @route   GET /api/orders/date-range
// @access  Private/Admin
export const getOrdersByDateRange = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;
    const orders = await Order.findAll({
        where: {
            createdAt: {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            }
        }
    });
    if (!orders.length) {
        res.status(404).json({ message: 'No orders found in this date range' });
    } else {
        res.status(200).json(orders);
    }
});

// @desc    Get orders by status
// @route   GET /api/orders/status/:status
// @access  Private/Admin
export const getOrdersByStatus = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({
        where: {
            status: req.params.status
        }
    });
    if (!orders.length) {
        res.status(404).json({ message: 'No orders found with this status' });
    } else {
        res.status(200).json(orders);
    }
});

