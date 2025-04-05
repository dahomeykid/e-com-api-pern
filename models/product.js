import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
    brand: { type: DataTypes.STRING },
    reference: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
});

export default Product;
 