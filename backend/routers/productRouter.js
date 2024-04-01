const express = require("express");
const productController = require("../controller/productController.js");

const router = express.Router();

// route to get products
router.get("/:category", productController.getProductsByCategory);

//route to get products on search
router.get("/search/:searchString", productController.searchProducts);

//---------------------------------seller's
//route to fetch seller's product
router.get("/seller/:sellerID", productController.getSellerProducts);

//route to add product
router.post("/seller/:sellerID", productController.addProduct);

//route to update product
router.patch("/seller/:sellerID", productController.updateProduct);

//route to delete product
router.delete("/seller/:sellerID", productController.deleteProduct);

module.exports = router;
