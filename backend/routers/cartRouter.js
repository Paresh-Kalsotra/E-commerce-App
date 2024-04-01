const express = require("express");
const cartController = require("../controller/cartController.js");

const router = express.Router();

// route to update user cart
router.post("/:userId", cartController.updateCart);

//route to get user cart
router.get("/:userId", cartController.getUserCart);

module.exports = router;
