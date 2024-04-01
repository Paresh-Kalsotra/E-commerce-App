const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const verifyToken = require("./middleware/tokenCheck");
const routers = require("./routers");

const server = express();
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
server.use(express.json());

server.use(cors());

//------routers

server.use("/api/users", routers.userRouter);
server.use("/api/products", routers.productRouter);
server.use("/api/cart", verifyToken, routers.cartRouter);
server.use("/api/orders", verifyToken, routers.orderRouter);

//server.use("api/seller", sellerRouter);

server.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
