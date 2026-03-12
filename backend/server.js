const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoute = require("./routes/product.route");
const globalErrorHandler = require("./controller/errorControler");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 5000;
dotenv.config();

const app = express();

// ✅ Correct path: go up from backend/ to root, then into frontend/dist
const projectRoot = __dirname;
const distPath = path.join(projectRoot, "..", "frontend", "dist");

// Verify dist folder exists (debug)
if (process.env.NODE_ENV === "production") {
  console.log("📁 Dist path:", distPath);
  console.log("🔍 Dist exists?", fs.existsSync(distPath));
  if (fs.existsSync(distPath)) {
    console.log(
      "📄 index.html exists?",
      fs.existsSync(path.join(distPath, "index.html")),
    );
  }
}

// CORS for development
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/products", productRoute);

// Global Error Handler
app.use(globalErrorHandler);

// Production: Serve frontend
if (process.env.NODE_ENV === "production") {
  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback - serve index.html for all other routes
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Store server instance for graceful shutdown
let server;

connectDB()
  .then(() => {
    console.log("✅ Database connected");

    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📁 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(
        `🌐 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`,
      );
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.name, err.message);

  if (server) {
    server.close(() => {
      console.log("🔌 Server closed gracefully");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.name, err.message);

  if (server) {
    server.close(() => {
      console.log("🔌 Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Graceful shutdown for SIGTERM (production deployments)
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received, shutting down gracefully");
  if (server) {
    server.close(() => {
      console.log("🔌 Process terminated");
      process.exit(0);
    });
  }
});
