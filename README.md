### AI Flow

```text
Customer
   │
   ▼
AI Shopping Assistant
   │
   ▼
React Frontend
   │
   ▼
/api/ai
   │
   ▼
Node.js + Express
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
Customer
```

### AI Prompt Controls

The AI assistant is instructed to:

- Recommend only products provided in the application context
- Avoid inventing products
- Avoid inventing prices or specifications
- Compare products objectively
- Explain recommendations clearly
- Keep responses concise
- Maintain a professional shopping-assistant tone

---

# 🔐 Authentication & Role-Based Authorization

ShopSmart AI implements JWT-based authentication and role-based
authorization to provide secure access to customer and administrator
functionality.

## 🔑 Authentication Flow

```text
┌─────────────────┐
│      User       │
└────────┬────────┘
         │
         │ Register / Login
         ▼
┌─────────────────┐
│ React Frontend  │
└────────┬────────┘
         │
         │ POST /api/auth/login
         ▼
┌─────────────────┐
│ Express Backend │
└────────┬────────┘
         │
         │ Validate credentials
         ▼
┌─────────────────┐
│    MongoDB      │
└────────┬────────┘
         │
         │ User verified
         ▼
┌─────────────────┐
│    JWT Token    │
└────────┬────────┘
         │
         │ Authenticated requests
         ▼
┌──────────────────────────────┐
│    Protected Backend APIs    │
└──────────────┬───────────────┘
               │
        ┌──────┴───────┐
        ▼              ▼
   Customer          Admin
     Role             Role
        │              │
        ▼              ▼
Customer Dashboard  Admin Dashboard
```

## 👤 Customer Authentication Flow

```text
Register / Login
       ↓
Credential Validation
       ↓
JWT Authentication
       ↓
Customer Role Identified
       ↓
Customer Dashboard
       ↓
Products / Wishlist / Cart / Orders / AI
```

## 👨‍💼 Administrator Authentication Flow

```text
Admin Login
     ↓
Credential Validation
     ↓
JWT Authentication
     ↓
Admin Role Identified
     ↓
Admin Dashboard
     ↓
Products / Inventory / Customers / Orders / Sales / Admin AI
```

## 🛡️ Role-Based Authorization

The application uses role-based authorization to ensure that users
can access only the functionality permitted for their role.

| Role | Dashboard | Customer APIs | Admin APIs |
|------|-----------|---------------|------------|
| Customer | Customer Dashboard | ✅ | ❌ |
| Admin | Admin Dashboard | According to permissions | ✅ |

Authorization is enforced on the backend rather than relying only on
frontend route protection.

---

# 🛒 E-Commerce User Flow

The customer shopping workflow follows a complete e-commerce lifecycle:

```text
┌───────────────┐
│    Customer   │
└───────┬───────┘
        │
        ▼
┌───────────────────┐
│ Browse Products   │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Product Details   │
└─────────┬─────────┘
          │
          ├───────────────┐
          ▼               ▼
┌────────────────┐  ┌────────────────┐
│ Add to Wishlist│  │ Add to Cart    │
└────────────────┘  └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │ Manage Cart    │
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │ Place Order    │
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │ Order Created  │
                    └───────┬────────┘
                            │
                            ▼
                    ┌────────────────┐
                    │ Order History  │
                    │ & Tracking     │
                    └────────────────┘
```

### Customer Journey

1. User logs into the application.
2. User browses available products.
3. User views product details.
4. User can add products to the wishlist.
5. User can add products to the shopping cart.
6. User manages cart items and quantities.
7. User places an order.
8. The backend creates and stores the order.
9. User can view order history and order details.

---

# 🔄 Backend Request Flow

The frontend communicates with the backend through REST APIs.

```text
React Frontend
      │
      │ HTTP Request
      ▼
Express REST API
      │
      ▼
Authentication / Authorization
      │
      ▼
Controller / Route Logic
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
React Frontend
```

This architecture separates frontend presentation, backend business
logic, authentication, and database operations.

---

# 👨‍💼 Admin Management Flow

Administrators have a separate dashboard for managing the platform.

```text
Admin Login
     │
     ▼
JWT Authentication
     │
     ▼
Role Verification
     │
     ▼
Admin Dashboard
     │
     ├───────────────┐
     ▼               ▼
 Products         Inventory
     │               │
     └───────┬───────┘
             │
      ┌──────┴───────────┐
      ▼                  ▼
  Customers            Orders
      │                  │
      └────────┬─────────┘
               ▼
             Sales
```

### Admin Responsibilities

- Manage products
- Monitor inventory
- Manage customers
- Manage orders
- View sales-related information
- Access administrative AI functionality
- Use protected administrator APIs

---

# 🏗️ System Architecture

```text
                         Internet
                            │
                            ▼
                  ┌──────────────────┐
                  │ Vercel           │
                  │ React Frontend   │
                  └────────┬─────────┘
                           │
                           │ HTTPS / REST API
                           ▼
                  ┌──────────────────┐
                  │ Render           │
                  │ Node + Express   │
                  └────────┬─────────┘
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
       ┌────────────────┐    ┌────────────────┐
       │ MongoDB Atlas  │    │ Groq AI        │
       │ Database       │    │ AI Service     │
       └────────────────┘    └────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- TypeScript
- Vite
- React Router
- Redux / Redux Toolkit
- Axios
- Bootstrap
- React Bootstrap
- React Icons
- CSS

## Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- REST APIs
- JWT Authentication

## AI

- Groq API
- OpenAI-compatible client
- Llama-based model

## Security & Middleware

- Helmet
- CORS
- Express Rate Limit
- Compression
- Morgan
- Centralized Error Handling

## API Documentation

- Swagger UI
- swagger-ui-express

## Development & Deployment

- Git
- GitHub
- VS Code
- Vercel
- Render
- MongoDB Atlas

---

# 🔌 REST API Architecture

The backend is organized into modular API routes.

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
| API Documentation | `/api-docs` |

---

# 📂 Project Structure

```text
shopsmart-ai/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── ...
```

---

# 🚀 Deployment

## Frontend

The React frontend is deployed using Vercel.

**Live Application:**  
https://shopsmart-ai-murex.vercel.app

## Backend

The Node.js + Express backend is deployed using Render.

**Backend:**  
https://shopsmart-ai-vqjp.onrender.com

## Database

MongoDB Atlas is used as the production database.

## AI

Groq API provides the AI functionality.

---

# 🔐 Environment Variables

Sensitive information is intentionally excluded from the repository.

Never commit:

```text
.env
```

Required environment variables include:

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Use your own credentials when running the project locally.

---

# 🧪 Testing

The main customer and administrator workflows have been tested.

### Customer

- Registration
- Login
- Dashboard
- Product browsing
- Wishlist
- Cart
- Orders
- Order details
- AI assistant
- Logout

### Administrator

- Admin login
- Admin dashboard
- Product management
- Inventory
- Customer management
- Order management
- Sales functionality
- Administrative functionality
- Logout

### Production

- Frontend deployment
- Backend deployment
- MongoDB connection
- API requests
- Authentication
- Role-based authorization
- CORS
- `/health` endpoint

---

# 📸 Screenshots

Screenshots of the major application workflows will be added here.

Recommended screenshots:

- Customer Login
- Customer Dashboard
- Product Listing
- AI Shopping Assistant
- Cart
- Orders
- Admin Dashboard
- Inventory Management

---

# 🔮 Future Enhancements

- AI personalization using customer shopping behavior
- AI shopping agent
- AI review summarization
- AI price intelligence
- Advanced admin business intelligence
- Automated frontend and backend testing
- GitHub Actions CI/CD
- Application monitoring

---

# 👩‍💻 Author

## Bhargavi Urumadla

**Full-Stack Developer | React.js | TypeScript | Node.js | AI**

GitHub:  
https://github.com/Bhargavi-urumadla

---

# 📜 License

This project is intended as a portfolio and learning project.