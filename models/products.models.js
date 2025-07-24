const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: Number,
    position: Number, // starts at 1
    status: String,
    deleted: Boolean
});

const products = mongoose.model("Product", ProductSchema, "products");

module.exports = products;