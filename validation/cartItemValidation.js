import Joi from "joi";

export const cartItemSchema = Joi.object({
    cartId: Joi.number().integer().required(),
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().required(),
    price: Joi.number().required(),
});

export const cartItemUpdateSchema = Joi.object({
    cartId: Joi.number().integer().optional(),
    productId: Joi.number().integer().optional(),
    quantity: Joi.number().integer().optional(),
    price: Joi.number().optional(),
});