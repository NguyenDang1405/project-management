const mongoose = require("mongoose");
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: Number,
    position: Number, // starts at 1
    status: String,
    slug: { 
        type: String, 
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
}, {
    timestamps: true
});

const products = mongoose.model("Product", ProductSchema, "products");

module.exports = products;