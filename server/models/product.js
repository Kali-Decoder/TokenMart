const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brandName: String,
  brandDescription: String,
  brandId: Number,
  description: String,
  title: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
  price: String,
});

module.exports = mongoose.model("Product", productSchema);
