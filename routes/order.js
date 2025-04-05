import express from "express";
import { Order, OrderItem } from "../models/order.js";

const router = express.Router();


// Create an order
router.post("/", async (req, res) => {
  try {
    const { products } = req.body;
    let totalAmount = 0;

    const order = await Order.create({ totalAmount });

    for (let item of products) {
      totalAmount += item.quantity * item.price;
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      });
    }

    await order.update({ totalAmount });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  const orders = await Order.findAll({ include: "OrderItems" });
  res.json(orders);
});
