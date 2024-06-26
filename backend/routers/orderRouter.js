const express = require("express");
const orderController = require("../controller/orderController.js");

const router = express.Router();

// route to place order
router.post("/:userId", orderController.placeOrder);

//route to get orders of a user
router.get("/:userId", orderController.getOrdersByUserId);

//route to get order for seller
router.get("/seller/:sellerID", orderController.getOrdersForSeller);

module.exports = router;
