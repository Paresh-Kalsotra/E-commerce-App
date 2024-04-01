const express = require("express");
const userController = require("../controller/userController.js");


const router = express.Router();

//route to signup user
router.post("/signup", userController.signupUser);

//rpute to login user
router.post("/login",  userController.loginUser); //checking  token

module.exports = router;
