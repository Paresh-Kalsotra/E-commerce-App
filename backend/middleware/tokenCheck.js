const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    let token = req.header("Auth-Token");

    const decoded = jwt.verify(token, process.env.jwt_key);

    next();
  } catch (err) {
    console.log("Auth Error: ", err.message);
    res.status(401).json({ message: "Unauthorised" }); //authentication failed
  }
};
