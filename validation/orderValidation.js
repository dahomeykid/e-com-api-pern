import Joi from "joi";

// Order validation schema using Joi
// This schema will validate the order data before creating or updating an order
export const orderSchema = Joi.object({
    userId: Joi.number().integer().required(),
    cartId: Joi.number().integer().required(),
    addressId: Joi.number().integer().required(),
    paymentId: Joi.number().integer().optional(),
    status: Joi.string().valid('pending', 'completed', 'cancelled').optional()
});

export const orderUpdateSchema = Joi.object({
    userId: Joi.number().integer().optional(),
    cartId: Joi.number().integer().optional(),
    addressId: Joi.number().integer().optional(),
    paymentId: Joi.number().integer().optional(),
    status: Joi.string().valid('pending', 'completed', 'cancelled').optional()
});