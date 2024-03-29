const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./router/userRouter");
const productRouter = require(`./router/productRouter`);
const cartRouter = require("./router/cartRouter");
const orderRouter = require(`./router/orderRouter`);
const verifyToken = require("./middleware/tokenCheck");

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI;

//-----connecting to mongo db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//-----middlewares
app.use(express.json());

app.use(cors());

//------routers

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", verifyToken, cartRouter);
app.use("/api/orders", verifyToken, orderRouter);

//app.use("api/seller", sellerRouter);

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
