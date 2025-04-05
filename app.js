import { config } from "dotenv";
import express from "express";
import cors from "cors";

import productRoutes from "./routes/product.js";
import categoryRoutes from "./routes/category.js";
import orderRoutes from "./routes/order.js";


config(); // Load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());
// Middleware to parse URL-encoded data
// This is needed for form submissions and URL-encoded data in requests
//app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

// Sample route for the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the E-Com API!");
});


// Error handling middleware
app.use((err, req, res, next) => {
  res.status(res.statusCode || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

export default app;