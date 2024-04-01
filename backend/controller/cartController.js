const userModel = require("../models/userModel.js");

//func to update user cart by finding by id
async function updateCart(req, res) {
  try {
    const _id = req.params.userId;
    const { cart } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { cart },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart" });
  }
}

//function to find user by id and return cart
async function getUserCart(req, res) {
  try {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Can't retrieve cart items" });
  }
}
module.exports = { updateCart, getUserCart };
