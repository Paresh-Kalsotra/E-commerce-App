const userRouter = require("./userRouter");
const sellerRouter = require("./sellerRouter");
const productRouter = require(`./productRouter`);
const cartRouter = require("./cartRouter");
const orderRouter = require(`./orderRouter`);
const wishlistRouter = require(`./wishlistRouter`);

module.exports = {
  userRouter,
  sellerRouter,
  productRouter,
  cartRouter,
  orderRouter,
  wishlistRouter,
};
