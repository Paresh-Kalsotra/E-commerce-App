const { Schema, model } = require("mongoose");

const sellerSchema = new Schema({
  sellerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, //email validation(regex)
  },
  password: {
    type: String,
    required: true,
  },
  products: { type: Array, default: [] },
});

const sellerModel = model("seller", sellerSchema);

module.exports = sellerModel;
