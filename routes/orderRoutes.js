import express from "express";
import { createOrder, updateOrder, getOrderById, getOrders, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

// All routes in this file are prefixed with api/orders
router.route("/")
  .get(getOrders)
  .post(createOrder);

router.route("/:id")
   .get(getOrderById) // Get a single order by ID
   .put(updateOrder)
   .delete(deleteOrder);

