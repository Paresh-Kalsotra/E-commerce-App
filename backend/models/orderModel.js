const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const orderModel = model("Orders", orderSchema);
module.exports = orderModel;
