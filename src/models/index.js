const User = require("./User");
const Category = require("./Category");
const Product = require("./Product");

// product -> categoryId
Product.belongsTo(Category) 
Category.hasMany(Product)

