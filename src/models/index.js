
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

// product -> categoryId
Product.belongsTo(Category) 
Category.hasMany(Product)

