# 🛍️ ShopSmart AI

> An AI-Powered E-Commerce Platform built using Node.js, Express.js, MongoDB, JWT Authentication, and Groq Llama AI.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Swagger](https://img.shields.io/badge/API-Swagger-success)
![AI](https://img.shields.io/badge/AI-Groq%20Llama%203.3-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📖 Overview

ShopSmart AI is a modern AI-powered e-commerce backend that provides secure authentication, product management, shopping cart, wishlist, order management, and an intelligent shopping assistant.

The AI Assistant helps users discover products, compare items, and receive personalized shopping recommendations using **Groq Llama 3.3**.

---

# ✨ Features

### 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes

---

### 🛍 Products

- Add Product
- Update Product
- Delete Product
- Search Products
- Featured Products
- Pagination
- Filtering
- Sorting

---

### 🛒 Cart

- Add to Cart
- Update Quantity
- Remove from Cart
- View Cart

---

### ❤️ Wishlist

- Add to Wishlist
- Remove from Wishlist
- View Wishlist

---

### 📦 Orders

- Place Order
- Cancel Order
- Order History
- Update Order Status
- Delete Order

---

### 🤖 AI Shopping Assistant

- Product Recommendations
- Compare Products
- Smart Shopping Suggestions
- Conversation Memory
- Personalized Responses

Powered by **Groq Llama 3.3**

---

### 📖 API Documentation

Interactive Swagger documentation available at:

```
http://localhost:5000/api-docs
```

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
- Rate Limiter
- Compression

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
└── package.json
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/shopsmart-ai.git
```

```
cd shopsmart-ai
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

---

## Run Server

```bash
npm run dev
```

---

Server

```
http://localhost:5000
```

Swagger

```
http://localhost:5000/api-docs
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|----------|--------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/profile |

---

## Products

| Method | Endpoint |
|----------|----------------------|
| POST | /api/products |
| GET | /api/products |
| GET | /api/products/search |
| GET | /api/products/featured |
| GET | /api/products/:id |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |

---

## Cart

| Method | Endpoint |
|----------|----------------|
| POST | /api/cart |
| GET | /api/cart |
| PUT | /api/cart/:id |
| DELETE | /api/cart/:id |

---

## Wishlist

| Method | Endpoint |
|----------|---------------------|
| POST | /api/wishlist |
| GET | /api/wishlist |
| DELETE | /api/wishlist/:id |

---

## Orders

| Method | Endpoint |
|----------|-------------------------|
| POST | /api/orders |
| GET | /api/orders |
| GET | /api/orders/my-orders |
| GET | /api/orders/:id |
| PUT | /api/orders/:id/status |
| PUT | /api/orders/:id/cancel |
| DELETE | /api/orders/:id |

---

## AI Assistant

| Method | Endpoint |
|----------|----------------|
| POST | /api/ai/chat |

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Helmet Security
- API Rate Limiting
- Input Validation
- Centralized Error Handling

---

# 📷 Screenshots

## Swagger Documentation

(Add Screenshot)

---

## MongoDB Atlas

(Add Screenshot)

---

## Postman Collection

(Add Screenshot)

---

# 🚀 Future Enhancements

- Payment Gateway Integration
- Admin Dashboard
- Product Reviews
- Product Ratings
- Inventory Management
- Email Notifications
- AI Voice Shopping Assistant
- Recommendation Engine Improvements

---

# 👩‍💻 Author

**Bhargavi Urumadla**

- MCA Graduate
- Full Stack Developer
- React.js | Node.js | MongoDB | AI

GitHub:
https://github.com/yourusername

LinkedIn:
https://linkedin.com/in/yourprofile

---

# ⭐ Support

If you found this project helpful, please give it a ⭐ on GitHub.

---