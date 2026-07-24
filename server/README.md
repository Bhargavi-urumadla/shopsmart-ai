# 🛍️ ShopSmart AI Backend

> 🚀 An AI-Powered E-Commerce REST API built with **Node.js**, **Express.js**, **MongoDB Atlas**, **JWT Authentication**, and **Groq Llama 3.3**. It provides secure authentication, product management, shopping cart, wishlist, order management, AI shopping assistance, inventory management, sales analytics, and admin dashboards.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Swagger](https://img.shields.io/badge/API-Swagger-success)
![Groq AI](https://img.shields.io/badge/AI-Groq%20Llama%203.3-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

# 📖 Overview

ShopSmart AI is a modern AI-powered e-commerce backend designed using RESTful architecture. It provides secure authentication, product management, shopping cart, wishlist, order processing, inventory management, sales analytics, customer management, and AI-powered shopping recommendations.

The platform also includes an **Admin Dashboard** with business insights, inventory tracking, customer management, and sales analytics.

---

# ✨ Features

## 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
- Password Hashing (bcryptjs)
- Protected Routes

---

## 🛍 Product Management

- Add Product
- Update Product
- Delete Product
- Get Product Details
- Product Search
- Featured Products
- Product Filtering
- Product Sorting
- Pagination

---

## 🛒 Shopping Cart

- Add to Cart
- Update Cart Quantity
- Remove from Cart
- View Cart
- Clear Cart

---

## ❤️ Wishlist

- Add to Wishlist
- Remove from Wishlist
- View Wishlist

---

## 📦 Order Management

- Place Order
- View Order History
- Get Order Details
- Cancel Order
- Admin Order Management
- Update Order Status
- Delete Orders

---

## 🤖 AI Shopping Assistant

- Product Recommendations
- Product Comparison
- Smart Shopping Suggestions
- Personalized Responses
- AI-powered Customer Assistance

**Powered by Groq Llama 3.3**

---

## 📊 Inventory Management

- Inventory Overview
- Low Stock Products
- Out of Stock Products
- Update Product Stock
- Restock Products
- Inventory History

---

## 📈 Sales Analytics

- Sales Overview
- Revenue Analytics
- Monthly Sales Report
- Top Selling Products
- Top Categories

---

## 👥 Customer Management

- View Customers
- Customer Details
- Block / Unblock Customers
- Delete Customers

---

## 🧠 Admin AI Dashboard

- AI Business Insights
- Revenue Trends
- Sales Analysis
- Low Stock Alerts
- Smart Recommendations

---

## 📖 API Documentation

Interactive API documentation powered by Swagger UI.

```
http://localhost:5000/api-docs
```

---

# 🏗️ Architecture

```
Client
    │
    ▼
Routes
    │
Controllers
    │
Services
    │
Models
    │
MongoDB Atlas
```

### Middleware

- JWT Authentication
- Admin Authorization
- Validation
- Error Handling

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Authentication

- JWT
- bcryptjs

## AI

- Groq API
- Llama 3.3

## API Documentation

- Swagger UI
- Swagger JSDoc

## Validation

- express-validator

## Security

- Helmet
- CORS
- express-rate-limit
- Compression

## Development

- Nodemon

---

# 📂 Project Structure

```
ShopSmart-AI
│
├── config
│   ├── db.js
│   └── swagger.js
│
├── controllers
│
├── middleware
│
├── models
│
├── routes
│
├── services
│
├── validators
│
├── utils
│
├── server.js
│
├── package.json
│
├── .env.example
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/shopsmart-ai.git
```

```bash
cd shopsmart-ai
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

NODE_ENV=development
```

---

## Run Development Server

```bash
npm run dev
```

Backend:

```
http://localhost:5000
```

Swagger:

```
http://localhost:5000/api-docs
```

---

# 📡 API Modules

## 🔐 Authentication

- Register User
- Login User
- Get User Profile

---

## 🛍 Products

- Create Product
- Get Products
- Get Product By ID
- Update Product
- Delete Product
- Featured Products
- Search Products

---

## 🛒 Cart

- Add Item
- View Cart
- Update Quantity
- Remove Item
- Clear Cart

---

## ❤️ Wishlist

- Add Item
- Remove Item
- View Wishlist

---

## 📦 Orders

- Place Order
- Order History
- Order Details
- Cancel Order

---

## 🤖 AI Assistant

- AI Shopping Chat
- Product Recommendations

---

## 📊 Inventory

- Inventory Overview
- Low Stock
- Out of Stock
- Update Stock
- Restock Products
- Inventory History

---

## 📈 Sales Analytics

- Sales Overview
- Revenue Report
- Monthly Sales
- Top Products
- Top Categories

---

## 👥 Customer Management

- Get Customers
- Customer Details
- Block / Unblock Customer
- Delete Customer

---

## 📦 Admin Order Management

- View All Orders
- Order Details
- Update Order Status
- Delete Orders

---

## 🧠 Admin AI

- AI Dashboard Insights

---

# 🔒 Security Features

- JWT Authentication
- Role-Based Authorization
- Password Hashing (bcryptjs)
- Protected Routes
- Helmet Security
- CORS
- Rate Limiting
- Input Validation
- Centralized Error Handling

---

# 📖 API Documentation

Swagger UI:

```
http://localhost:5000/api-docs
```

Features:

- Interactive Documentation
- JWT Authorization Support
- Request & Response Models
- API Testing from Browser

---

# 🌐 Deployment

## Backend

Render

## Database

MongoDB Atlas

## Environment Variables

```
PORT

MONGO_URI

JWT_SECRET

GROQ_API_KEY

NODE_ENV
```

---

# 📷 Screenshots

## Swagger UI

> Add Screenshot

---

## Postman Collection

> Add Screenshot

---

## MongoDB Atlas

> Add Screenshot

---

# 🚀 Future Enhancements

- Stripe / Razorpay Payment Integration
- Product Reviews & Ratings
- Cloudinary Image Upload
- Email Notifications
- AI Recommendation Improvements
- Docker Support
- Unit & Integration Testing
- CI/CD Pipeline
- Redis Caching

---

# 👩‍💻 Author

**Bhargavi Urumadla**

MCA Graduate | Full Stack Developer

### Tech Stack

- React.js
- TypeScript
- Node.js
- Express.js
- MongoDB
- Python
- REST APIs
- AI Integration

### Connect

**GitHub**

```
https://github.com/your-github-username
```

**LinkedIn**

```
https://linkedin.com/in/your-linkedin-profile
```

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the **MIT License**.