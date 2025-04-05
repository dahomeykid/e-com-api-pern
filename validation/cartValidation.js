import Joi from "joi";

export const cartSchema = Joi.object({
    userId: Joi.number().integer().required(),
    totalPrice: Joi.number().required(),
    totalQuantity: Joi.number().integer().required(),
});

