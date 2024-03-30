const order = require("../models/orderModel");
const user = require("../models/userModel.js");

//function to get userOrders by category
async function placeOrder(req, res) {
  try {
    const userId = req.params.userId;
    const { orderItems } = req.body;

    //saving order  in the database
    const newOrder = new order({
      userId: userId,
      items: orderItems,
    });
    await newOrder.save();

    //adding orderid to user document
    await user.findByIdAndUpdate(userId, {
      $push: { orders: newOrder._id },
    });

    return res.status(201).json({ message: "Your Order has been placed!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't place Order " });
  }
}

//function to get orders
async function getOrdersByUserId(req, res) {
  try {
    userId = req.params.userId;
    const userOrders = await order.find({ userId: userId });
    res.status(200).json(userOrders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't place Order " });
  }
}

module.exports = { placeOrder, getOrdersByUserId };
