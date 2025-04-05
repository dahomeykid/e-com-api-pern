import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const WishlistItem = sequelize.define("WishlistItem", {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});
export default WishlistItem;