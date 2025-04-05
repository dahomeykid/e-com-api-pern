import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Review = sequelize.define("Review", {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true, // Enable timestamps for createdAt and updatedAt
});
export default Review;