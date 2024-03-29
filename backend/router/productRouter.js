const express = require("express");
const productController = require("../controller/productController.js");

const router = express.Router();

// route to get products
router.get("/:category", productController.getProductsByCategory);

//route to get products on search
router.get("/search/:searchString", productController.searchProducts);

module.exports = router;
