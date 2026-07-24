
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const aiRoutes = require("./routes/aiRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const adminAIRoutes = require("./routes/adminAIRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const salesRoutes = require("./routes/salesRoutes");
const customerRoutes = require("./routes/customerRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

// ==============================
// Validate Environment Variables
// ==============================
const requiredEnv = [
  "MONGODB_URI",
  "JWT_SECRET",
  "GROQ_API_KEY",
];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
});

const app = express();

// ==============================
// Connect Database
// ==============================
connectDB();

// ==============================
// Security Middleware
// ==============================
app.use(helmet());
// console.log("CLIENT_URL =", process.env.CLIENT_URL);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(compression());

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  })
);

// ==============================
// Body Parser
// ==============================
app.use(express.json());
// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
// ==============================
// API Routes
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin-ai", adminAIRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/admin/sales", salesRoutes);
app.use("/api/admin/customers", customerRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
// ==============================
// Health Check
// ==============================
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ShopSmart AI Backend is healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ==============================
// 404 Handler
// ==============================
app.use((req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// ==============================
// Global Error Handler
// ==============================
app.use(errorHandler);

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
========================================
🚀 ShopSmart AI Backend Started
🌐 Server   : http://localhost:${PORT}
❤️ Health   : http://localhost:${PORT}/health
📦 Environment : ${process.env.NODE_ENV || "development"}
========================================
`);
});