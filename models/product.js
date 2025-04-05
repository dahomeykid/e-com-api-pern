export default  (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: "categoryId" });
  };
  return Product;
};