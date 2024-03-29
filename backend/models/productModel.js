const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  sellerId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  images: {
    type: Array,
  },
});

const productModel = model("Product", productSchema);
module.exports = productModel;
