import express from 'express';
import { createOrderItem, getOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem } from '../controllers/orderItemController.js';

const router = express.Router();

router.route('/')
    .get(getOrderItems)
    .post(createOrderItem);

router.route('/:id')
    .get(getOrderItemById)
    .put(updateOrderItem)
    .delete(deleteOrderItem);

export default router;