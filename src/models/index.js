// importaciones
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");
const Cart = require("./Cart");
const Purchase = require("./Purchase");
const ProductImg = require("./ProductImg");

// product -> categoryId
// a product le agregamos categoryId
Product.belongsTo(Category) 
Category.hasMany(Product)

// cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)

// cart -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart) 

// Purchase -> userId
Purchase.belongsTo(User)
User.hasMany(Purchase)

// Purchase -> productId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

// ProductImg -> productId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)