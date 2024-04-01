const seller = require("../models/sellerModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ----------------------------------------------------------------
//function to sign  up a new seller
async function signupSeller(req, res) {
  try {
    let existingSeller = await seller.find({ email: req.body.email });

    if (existingSeller.length >= 1) {
      return res.status(422).json({ message: "Seller Already Exits" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Creating a new seller
    const newSeller = new seller({
      sellerName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    await newSeller.save();

    //jwt token generation
    const token = jwt.sign({ email: newSeller.email }, process.env.jwt_key);

    res.status(200).json({
      userToken: token,
      userID: newSeller._id,
      message: "Authenticated",
    });
  } catch (err) {
    if (err._message === "seller validation failed") {
      return res.status(422).json({ mesage: "Enter a valid email" });
    }
    console.log(err);
    return res.status(500).json({ message: "We are unable to sign you in" });
  }
}

// ----------------------------------------------------------------
//function to login a seller
async function loginSeller(req, res) {
  let existingSeller = await seller.find({ email: req.body.email });

  //checking for null //can check for only one or multiple seller with same email
  if (existingSeller.length !== 1) {
    return res
      .status(404)
      .json({ message: "Seller doesn't exist, Please Signup!" });
  }
  try {
    bcrypt.compare(
      req.body.password,
      existingSeller[0].password,
      (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "We are unable to log you in" });
        }
        if (!result) {
          return res
            .status(401)
            .json({ message: "Incorrect email or password" }); //un authorized
        }

        //jwt token generation
        const token = jwt.sign(
          { email: existingSeller[0].email },
          process.env.jwt_key,
          {
            expiresIn: "5h",
          }
        );

        res.status(200).json({
          userToken: token,
          userID: existingSeller[0]._id,
          message: "Authenticated",
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "We are unable to log you in." });
  }
}

module.exports = { signupSeller, loginSeller };
