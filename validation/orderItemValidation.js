import Joi from "joi";

export const orderItemSchema = Joi.object({
  orderId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().positive().required()
});

export const orderItemUpdateSchema = Joi.object({
    quantity: Joi.number().integer().min(1),
    price: Joi.number().positive()
}).or("quantity", "price");
