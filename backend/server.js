const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoute = require("./routes/product.route");
const globalErrorHandler = require("./controller/errorControler");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(
  cors({
    origin:
      "https://product-store-56i76bnhx-hamedhussein004-3929s-projects.vercel.app",
  }),
);

app.use(express.json());
app.use("/api/products", productRoute);

app.use(globalErrorHandler);

connectDB().then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log("server started ");
  });
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
