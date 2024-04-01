const express = require("express");
const sellerController = require("../controller/sellerController.js");

const router = express.Router();

//route to signup seller
router.post("/signup/", sellerController.signupSeller);

//rpute to login seller
router.post("/login/", sellerController.loginSeller);

module.exports = router;
