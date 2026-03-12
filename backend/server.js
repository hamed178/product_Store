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

const allowedOrigins = [
  "http://localhost:5173", // Development
  process.env.FRONTEND_URL, // Production (from .env)
  "https://product-store-six-virid.vercel.app", // Replace with your actual frontend URL
].filter(Boolean);

console.log("🔐 Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
