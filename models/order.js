import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Order = sequelize.define("Order", {
    orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    shippingAddress: { type: DataTypes.STRING, allowNull: false },
    billingAddress: { type: DataTypes.STRING, allowNull: false },
    paymentStatus: { type: DataTypes.STRING, defaultValue: "pending" },
    shippingCost: { type: DataTypes.DECIMAL, allowNull: false },
    tax: { type: DataTypes.DECIMAL, allowNull: false },
    discount: { type: DataTypes.DECIMAL, defaultValue: 0 },
    totalAmount: { type: DataTypes.DECIMAL, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "pending" }
});

export default Order;