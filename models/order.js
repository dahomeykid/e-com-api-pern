export default  (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    totalAmount: { type: DataTypes.DECIMAL, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "pending" }
  });
  Order.associate = (models) => {
    Order.belongsToMany(models.Product, {
      through: models.OrderItem,
      foreignKey: "orderId"
    });
  };
  return Order;
};