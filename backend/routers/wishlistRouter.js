const express = require("express");
const wishlistController = require("../controller/wishlistController.js");

const router = express.Router();

// route to update user wishlist
router.post("/:userId", wishlistController.updateWishlist);

//route to get user wishlist
router.get("/:userId", wishlistController.getUserWishlist);

module.exports = router;
