// ========================================
// ShopSmart AI - Backend Server
// ========================================

// IMPORTANT:
// Load environment variables BEFORE importing
// modules that may use process.env.

const dotenv = require("dotenv");

dotenv.config();

// ========================================
// Imports
// ========================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const aiRoutes = require("./routes/aiRoutes");

const adminAIRoutes = require("./routes/adminAIRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const salesRoutes = require("./routes/salesRoutes");
const customerRoutes = require("./routes/customerRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

const errorHandler = require("./middleware/errorMiddleware");

// ========================================
// Environment Validation
// ========================================

const requiredEnv = [
  "MONGODB_URI",
  "JWT_SECRET",
  "GROQ_API_KEY",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(
      `❌ Missing required environment variable: ${key}`
    );
  }
});

// ========================================
// Express App
// ========================================

const app = express();

// ========================================
// CORS
// ========================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://shopsmart-ai-murex.vercel.app",
];

// Add CLIENT_URL if it is different
if (
  process.env.CLIENT_URL &&
  !allowedOrigins.includes(process.env.CLIENT_URL)
) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

console.log("🌐 Allowed CORS Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without Origin header
      // such as Postman/server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);

      return callback(
        new Error(`Not allowed by CORS: ${origin}`)
      );
    },

    credentials: true,
  })
);

// ========================================
// Security Middleware
// ========================================

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
      success: false,
      message:
        "Too many requests. Please try again later.",
    },
  })
);

// ========================================
// Body Parser
// ========================================

app.use(express.json());

// ========================================
// Swagger
// ========================================

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// ========================================
// API Routes
// ========================================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/wishlist", wishlistRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/ai", aiRoutes);

// ========================================
// Admin Routes
// ========================================

app.use("/api/admin-ai", adminAIRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/admin/sales", salesRoutes);

app.use(
  "/api/admin/customers",
  customerRoutes
);

app.use(
  "/api/admin/orders",
  adminOrderRoutes
);

// ========================================
// Health Check
// ========================================

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ShopSmart AI Backend is healthy",
    environment:
      process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ========================================
// 404 Handler
// ========================================

app.use((req, res, next) => {
  const error = new Error(
    `Route Not Found - ${req.originalUrl}`
  );

  res.status(404);

  next(error);
});

// ========================================
// Global Error Handler
// ========================================

app.use(errorHandler);

// ========================================
// Server Startup
// ========================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("========================================");
    console.log("🚀 Starting ShopSmart AI Backend...");
    console.log("========================================");

    // Connect to MongoDB first
    await connectDB();

    console.log("✅ MongoDB connection established");

    // Start Express only after MongoDB connection
    app.listen(PORT, () => {
      console.log("========================================");
      console.log(
        `🚀 ShopSmart AI Backend running on port ${PORT}`
      );
      console.log(
        `🌐 Environment: ${
          process.env.NODE_ENV || "development"
        }`
      );
      console.log(
        `❤️ Health: http://localhost:${PORT}/health`
      );
      console.log("========================================");
    });
  } catch (error) {
    console.error(
      "❌ Failed to start ShopSmart AI Backend:"
    );

    console.error(error);

    process.exit(1);
  }
};

startServer();