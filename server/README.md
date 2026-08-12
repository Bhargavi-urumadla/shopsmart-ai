# 🛍️ ShopSmart AI — Backend

> 🚀 AI-powered e-commerce REST API built with Node.js, Express.js,
> MongoDB Atlas, JWT Authentication, and Groq AI.

The ShopSmart AI backend provides secure REST APIs for authentication,
products, wishlist, cart, orders, inventory, customer management,
sales analytics, and AI-powered shopping assistance.

It also provides protected administrator APIs for managing the
e-commerce platform.

---

# 📖 Overview

The ShopSmart AI backend follows a modular REST API architecture.

It is responsible for:

- User authentication
- JWT-based authorization
- Role-based access control
- Product management
- Wishlist management
- Shopping cart management
- Order processing
- Inventory management
- Customer management
- Sales analytics
- AI shopping assistance
- Administrative AI functionality

The backend communicates with the React frontend through REST APIs
and uses MongoDB Atlas as the production database.

---

# ✨ Features

## 🔐 Authentication & Authorization

- User registration
- User login
- JWT authentication
- Role-based authorization
- Password hashing with bcryptjs
- Protected routes
- Admin-only routes

### Authentication Flow

```text
Client
  │
  ▼
Register / Login
  │
  ▼
Express Authentication API
  │
  ▼
Validate Credentials
  │
  ▼
MongoDB
  │
  ▼
JWT Token
  │
  ▼
Authenticated Request
  │
  ▼
JWT Middleware
  │
  ▼
Role Authorization
  │
  ├───────────────┐
  ▼               ▼
Customer         Admin
  │               │
  ▼               ▼
Customer APIs    Admin APIs
```

Authentication verifies **who the user is**, while authorization
determines **what the user is allowed to access**.

---

# 🛍️ Product Management

- Create products
- Update products
- Delete products
- Get product details
- Product search
- Featured products
- Product filtering
- Product sorting
- Pagination

---

# 🛒 Shopping Cart

- Add products to cart
- Update cart quantity
- Remove cart items
- View cart
- Clear cart

---

# ❤️ Wishlist

- Add products to wishlist
- Remove products from wishlist
- View wishlist

---

# 📦 Order Management

### Customer

- Place orders
- View order history
- View order details
- Cancel orders
- Track order status

### Administrator

- View all orders
- View order details
- Update order status
- Delete orders

---

# 🤖 AI Shopping Assistant

ShopSmart AI integrates Groq AI through an OpenAI-compatible client.

The AI service supports:

- Product recommendations
- Product comparison
- Shopping assistance
- Product-related questions
- Shopping suggestions

### AI Architecture

```text
React Frontend
      │
      ▼
POST /api/ai
      │
      ▼
Express Backend
      │
      ▼
AI Service
      │
      ▼
Groq API
      │
      ▼
AI Response
      │
      ▼
React Frontend
```

The Groq API key is stored only on the backend and is never exposed
to the frontend.

---

# 📊 Inventory Management

- Inventory overview
- Low-stock products
- Out-of-stock products
- Update product stock
- Restock products
- Inventory information

---

# 📈 Sales Analytics

The backend provides APIs supporting administrative sales information,
including:

- Sales overview
- Revenue information
- Monthly sales information
- Top-selling products
- Top categories

---

# 👥 Customer Management

Administrators can manage customer information through protected APIs.

- View customers
- View customer details
- Block / unblock customers
- Delete customers

---

# 🧠 Admin AI

The backend also supports administrative AI functionality for
business-related insights.

Examples include:

- Business insights
- Sales analysis
- Revenue-related insights
- Inventory-related insights
- Smart recommendations

---

# 🏗️ Backend Architecture

```text
                    React Frontend
                           │
                           │ HTTPS / REST API
                           ▼
                    Express.js Server
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        Authentication              API Routes
        & Authorization                  │
                                        ▼
                                  Controllers
                                        │
                                        ▼
                                    Services
                                        │
                                        ▼
                                     Models
                                        │
                                        ▼
                                  MongoDB Atlas

                         AI Service
                              │
                              ▼
                           Groq API
```

---

# 🔄 API Request Flow

```text
Frontend
   │
   │ HTTP Request
   ▼
Express Router
   │
   ▼
Authentication Middleware
   │
   ▼
Authorization Middleware
   │
   ▼
Controller
   │
   ▼
Service / Business Logic
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB Atlas
   │
   ▼
JSON Response
   │
   ▼
Frontend
```

This architecture separates routing, authentication,
business logic, database access, and response handling.

---

# 🛡️ Middleware & Security

The backend uses several middleware components for security,
performance, and request processing.

### Security

- Helmet
- CORS
- JWT authentication
- Role-based authorization
- Password hashing
- Rate limiting
- Input validation

### Performance

- Compression

### Development & Logging

- Morgan
- Nodemon

### Error Handling

- Centralized error-handling middleware
- Custom 404 handling

---

# 🌐 CORS Configuration

The backend uses CORS to control which frontend applications
can communicate with the API.

Allowed frontend environments include:

```text
http://localhost:5173
http://localhost:5174
https://shopsmart-ai-murex.vercel.app
```

The production frontend communicates with the deployed backend
over HTTPS.

```text
Vercel
   │
   │ HTTPS
   ▼
Render Backend
   │
   ▼
REST APIs
```

---

# 🔌 API Modules

| Module | Endpoint |
|---|---|
| Authentication | `/api/auth` |
| Products | `/api/products` |
| Wishlist | `/api/wishlist` |
| Cart | `/api/cart` |
| Orders | `/api/orders` |
| AI Assistant | `/api/ai` |
| Admin AI | `/api/admin-ai` |
| Inventory | `/api/inventory` |
| Sales | `/api/admin/sales` |
| Customers | `/api/admin/customers` |
| Admin Orders | `/api/admin/orders` |
| Health Check | `/health` |
| Swagger Documentation | `/api-docs` |

---

# 📖 Swagger API Documentation

The backend includes interactive API documentation using Swagger UI.

### Local

```text
http://localhost:5000/api-docs
```

### Features

- Interactive API documentation
- API endpoint descriptions
- Request and response documentation
- API testing from the browser
- Authentication support where configured

---

# 🛠️ Technology Stack

## Runtime & Framework

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Authentication

- JSON Web Tokens (JWT)
- bcryptjs

## AI

- Groq API
- OpenAI-compatible client
- Llama 3.3 model

## Validation

- express-validator

## Security

- Helmet
- CORS
- express-rate-limit

## Performance

- Compression

## Logging

- Morgan

## API Documentation

- Swagger UI
- swagger-ui-express
- Swagger configuration

## Development

- Nodemon

---

# 📂 Project Structure

```text
server/
│
├── ai/
│
├── config/
│   ├── db.js
│   └── swagger.js
│
├── controllers/
│
├── middleware/
│
├── models/
│
├── routes/
│
├── services/
│   └── aiService.js
│
├── utils/
│
├── validators/
│
├── server.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

> `.env` is excluded from Git and should never be committed.

---

# 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Bhargavi-urumadla/shopsmart-ai.git
```

Navigate to the backend:

```bash
cd shopsmart-ai/server
```

Install dependencies:

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

For production, configure the corresponding environment variables
in the deployment platform.

### ⚠️ Never commit secrets

Never commit:

```text
.env
```

Never expose:

```text
MONGODB_URI
JWT_SECRET
GROQ_API_KEY
```

in frontend source code, GitHub, screenshots, or README files.

---

# ▶️ Run Locally

Start the backend in development mode:

```bash
npm run dev
```

Or start normally:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

Swagger:

```text
http://localhost:5000/api-docs
```

---

# ❤️ Health Check

The backend exposes a health-check endpoint:

```http
GET /health
```

Example response:

```json
{
  "success": true,
  "message": "ShopSmart AI Backend is healthy",
  "environment": "development"
}
```

This endpoint can be used to verify that the backend is running
correctly after deployment.

---

# 🌍 Deployment

## Frontend

The frontend is deployed on:

**Vercel**

```text
https://shopsmart-ai-murex.vercel.app
```

## Backend

The backend is deployed on:

**Render**

```text
https://shopsmart-ai-vqjp.onrender.com
```

## Production Health Check

```text
https://shopsmart-ai-vqjp.onrender.com/health
```

## Database

Production database:

**MongoDB Atlas**

## AI Service

Production AI integration:

**Groq API**

---

# 🧪 Backend Verification

Before deploying backend changes, verify:

### Local

- [ ] MongoDB connection succeeds
- [ ] Server starts successfully
- [ ] `/health` returns HTTP 200
- [ ] Swagger loads
- [ ] User registration works
- [ ] User login works
- [ ] Admin login works
- [ ] Customer authorization works
- [ ] Admin authorization works
- [ ] Product APIs work
- [ ] Cart APIs work
- [ ] Wishlist APIs work
- [Order APIs work
- [AI API works

### Production

- [ ] Render deployment succeeds
- [ ] MongoDB Atlas connection succeeds
- [ ] `/health` returns HTTP 200
- [ ] Vercel frontend can access backend APIs
- [ ] CORS works correctly
- [ ] Customer login works
- [ ] Admin login works
- [ ] Role-based authorization works
- [ ] AI functionality works
- [ ] No secrets are exposed

---

# 🔮 Future Enhancements

Potential future improvements include:

- Payment integration
- Product reviews and ratings
- Cloud image storage
- Email notifications
- Advanced AI recommendations
- Automated testing
- Docker support
- CI/CD pipeline
- Redis caching
- Application monitoring

---

# 👩‍💻 Author

**Bhargavi Urumadla**

MCA Graduate | Full-Stack Developer

### Technologies

- React.js
- TypeScript
- Node.js
- Express.js
- MongoDB
- Python
- REST APIs
- AI Integration

### GitHub

https://github.com/Bhargavi-urumadla

---

# 🤝 Contributing

This project is primarily maintained as a portfolio project.

Suggestions, issues, and improvements are welcome.

---

# ⭐ Support

If you find the project useful, consider giving the repository
a ⭐ on GitHub.

---

## 📚 Related Documentation

For complete system documentation, frontend architecture,
authentication flow, e-commerce workflow, deployment architecture,
and AI functionality, see the main project README:

```text
../README.md
```