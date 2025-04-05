import Joi from "joi";

// Category validation schema using Joi
// This schema will validate the category data before creating a new category
export const categorySchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(255).required(),
});

export const categoryUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
});
