const user = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// ----------------------------------------------------------------
//function to sign  up a new user
async function signupUser(req, res) {
  try {
    let existingUser = await user.find({ email: req.body.email });

    if (existingUser.length >= 1) {
      return res.status(422).json({ message: "User Already Exits" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Creating a new user
    const newUser = new user({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();

    //jwt token generation
    const token = jwt.sign({ email: newUser.email }, process.env.jwt_key);

    res.status(200).json({
      userToken: token,
      userID: newUser._id,
      message: "User Authenticated",
    });
  } catch (err) {
    if (err._message === "user validation failed") {
      return res.status(422).json({ mesage: "Enter a valid email" });
    }
    console.log(err);
    return res.status(500).json({ message: "We are unable to sign you in" });
  }
}

// ----------------------------------------------------------------
//function to login a user
async function loginUser(req, res) {
  let existingUser = await user.find({ email: req.body.email });

  //checking for null //can check for only one or multiple user with same email
  if (existingUser.length !== 1) {
    return res
      .status(404)
      .json({ message: "User doesn't exist, Please Signup!" });
  }
  try {
    bcrypt.compare(
      req.body.password,
      existingUser[0].password,
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
          { email: existingUser[0].email },
          process.env.jwt_key,
          {
            expiresIn: "5h",
          }
        );

        res.status(200).json({
          userToken: token,
          userID: existingUser[0]._id,
          message: "User Authenticated",
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.send(500).json({ message: "We are unable to log you in." });
  }
}

module.exports = { signupUser, loginUser };
