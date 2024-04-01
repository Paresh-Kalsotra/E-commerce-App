const userModel = require("../models/userModel.js");

//func to update user wishlist by finding by id
async function updateWishlist(req, res) {
  try {
    const _id = req.params.userId;
    const { wishlist } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { wishlist },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Wishlist updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating wishlist" });
  }
}

//function to find user by id and return wishlist
async function getUserWishlist(req, res) {
  try {
    const userId = req.params.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: "Can't retrieve wishlist items" });
  }
}
module.exports = { updateWishlist, getUserWishlist };
