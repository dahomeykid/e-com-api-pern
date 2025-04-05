import express from 'express';
import {
    getCartByUserId,
    createCart,
    updateCart,
    deleteCart
} from '../controllers/cartController.js';

const router = express.Router();

// All routes in this file are prefixed with api/users
router.route('/:userId')
    .get(getCartByUserId) // Get cart by user ID
    .post(createCart) // Create a new cart
    .put(updateCart) // Update cart by user ID
    .delete(deleteCart); // Delete cart by user ID

export default router;
