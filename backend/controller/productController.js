const product = require("../models/productModel");

//function to get products by category
async function getProductsByCategory(req, res) {
  try {
    const products = await product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//function to get products on search
async function searchProducts(req, res) {
  try {
    const searchString = req.params.searchString;

    const products = await product.find({
      $or: [
        { title: { $regex: `^${searchString}`, $options: "i" } },
        { category: { $regex: `^${searchString}`, $options: "i" } },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProductsByCategory,
  searchProducts,
};
