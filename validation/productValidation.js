import Joi from "joi";

// Product validation schema using Joi
// This schema will validate the product data before creating or updating a product
export const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    image: Joi.string().uri().optional(),
    brand: Joi.string().max(50).optional(),
    reference: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(255).optional(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).optional()
});

export const productUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    image: Joi.string().uri().optional(),
    brand: Joi.string().max(50).optional(),
    reference: Joi.string().min(3).max(50).optional(),
    description: Joi.string().max(255).optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().integer().min(0).optional()
});

