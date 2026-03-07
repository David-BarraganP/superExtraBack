// importaciones
const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");

// product -> categoryId
// a product le agregamos categoryId
Product.belongsTo(Category) 
Category.hasMany(Product)

