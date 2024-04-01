const productModel = require("../models/productModel");

//function to get products by category
async function getProductsByCategory(req, res) {
  try {
    const products = await productModel.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//function to get products on search
async function searchProducts(req, res) {
  try {
    const searchString = req.params.searchString;

    const products = await productModel.find({
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

//----------------------------
async function getSellerProducts(req, res) {
  try {
    const sellerID = req.params.sellerID;
    const products = await productModel.find({ sellerID: sellerID });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//func to add new product
async function addProduct(req, res) {
  try {
    const sellerID = req.params.sellerID;

    const newProduct = {
      ...req.body,
      images: [req.body.images || "https://via.placeholder.com/300x200"],
      sellerID: sellerID,
    };
    const product = await productModel.create(newProduct);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//func to update exiting product
async function updateProduct(req, res) {
  try {
    const sellerID = req.params.sellerID;
    const newProduct = { ...req.body, sellerID: sellerID };
    const product = await productModel.findByIdAndUpdate(
      { _id: req.body._id },
      newProduct,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//func to delete product
async function deleteProduct(req, res) {
  try {
    const product = await productModel.deleteMany({ _id: req.body._id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getProductsByCategory,
  searchProducts,
  getSellerProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
