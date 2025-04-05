import Product from './product.js';
import Category from './category.js';
import Order from './order.js';
import OrderItem from './orderItem.js';
import User from './user.js';
import Cart from './cart.js';
import CartItem from './cartItem.js';
import Address from './address.js';
import Payment from './payment.js';
import Review from './review.js';
import Wishlist from './wishlist.js';
import WishlistItem from './wishlistItem.js';

// Associations
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(OrderItem, { foreignKey: 'productId' });

Cart.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Cart, { foreignKey: 'userId' });

CartItem.belongsTo(Cart, { foreignKey: 'cartId' });
Cart.hasMany(CartItem, { foreignKey: 'cartId' });

CartItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(CartItem, { foreignKey: 'productId' });

Address.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Address, { foreignKey: 'userId' });

Payment.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasOne(Payment, { foreignKey: 'orderId' });

Review.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });

Review.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Review, { foreignKey: 'productId' });

Wishlist.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Wishlist, { foreignKey: 'userId' });

WishlistItem.belongsTo(Wishlist, { foreignKey: 'wishlistId' });
Wishlist.hasMany(WishlistItem, { foreignKey: 'wishlistId' });

WishlistItem.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(WishlistItem, { foreignKey: 'productId' });



export {
    Product,
    Category,
    Order,
    OrderItem,
    User,
    Cart,
    CartItem,
    Address,
    Payment,
    Review,
    Wishlist,
    WishlistItem
};