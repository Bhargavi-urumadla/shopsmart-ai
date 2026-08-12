# 🎨 ShopSmart AI — Frontend

The frontend of **ShopSmart AI** is a modern React + TypeScript
application that provides the customer and administrator interfaces
for the ShopSmart AI e-commerce platform.

The frontend communicates with the Node.js + Express backend through
REST APIs and provides separate role-based experiences for customers
and administrators.

---

## 🌐 Live Application

https://shopsmart-ai-murex.vercel.app

## 🔗 Main Repository

https://github.com/Bhargavi-urumadla/shopsmart-ai

## 🔧 Backend API

https://shopsmart-ai-vqjp.onrender.com

---

# ✨ Frontend Features

## 👤 Customer Experience

- User registration
- User login
- JWT-based authentication
- Role-based navigation
- Customer dashboard
- Product browsing
- Product details
- Wishlist management
- Shopping cart
- Order placement
- Order history
- Order details
- Order tracking
- Customer profile
- AI shopping assistant
- AI product recommendations
- Product comparison

---

## 👨‍💼 Administrator Experience

The frontend provides a separate protected administrator dashboard.

- Admin login
- Role-based navigation
- Product management
- Inventory management
- Customer management
- Order management
- Sales dashboard
- Administrative AI functionality
- Protected admin routes

---

# 🏗️ Frontend Architecture

```text
                         React Application
                                │
                ┌───────────────┴───────────────┐
                │                               │
                ▼                               ▼
        Public Pages                      Protected Pages
                │                               │
        ┌───────┴────────┐              ┌───────┴────────┐
        ▼                ▼              ▼                ▼
      Login           Register       Customer          Admin
                                      Dashboard       Dashboard
                                         │                │
                                         └───────┬────────┘
                                                 ▼
                                           API Services
                                                 │
                                                 ▼
                                          REST Backend
                                                 │
                                                 ▼
                                           MongoDB Atlas
```

---

# 🔐 Authentication Flow

The frontend implements authentication and role-based navigation.

```text
User
 │
 ▼
Login / Register
 │
 ▼
Backend Authentication API
 │
 ▼
JWT Token
 │
 ▼
Frontend Authentication State
 │
 ▼
Role Detection
 │
 ├───────────────┐
 ▼               ▼
Customer        Admin
 │               │
 ▼               ▼
Customer       Admin
Dashboard      Dashboard
```

The frontend uses the authenticated user's role to determine which
dashboard and application functionality should be available.

Backend authorization remains responsible for protecting sensitive
APIs.

---

# 🧭 Application Routing

The application uses React Router for client-side navigation.

### Public Routes

```text
/
├── /login
└── /register
```

### Customer Routes

```text
/dashboard
/products
/products/:id
/wishlist
/cart
/orders
/orders/:id
/profile
/ai-assistant
```

### Administrator Routes

```text
/admin
/admin/products
/admin/inventory
/admin/customers
/admin/orders
/admin/sales
/admin/ai
```

> Route names may evolve as the application continues to develop.

---

# 🛒 Customer UI Flow

```text
Login
  │
  ▼
Customer Dashboard
  │
  ├── Products
  │     │
  │     ├── Product Details
  │     ├── Wishlist
  │     └── Add to Cart
  │
  ├── Cart
  │     │
  │     └── Checkout / Order
  │
  ├── Orders
  │     │
  │     └── Order Details
  │
  ├── Profile
  │
  └── AI Assistant
```

---

# 👨‍💼 Admin UI Flow

```text
Admin Login
     │
     ▼
Admin Dashboard
     │
     ├── Products
     │
     ├── Inventory
     │
     ├── Customers
     │
     ├── Orders
     │
     ├── Sales
     │
     └── AI Insights
```

---

# 🤖 AI Assistant Integration

The frontend provides an interactive AI shopping assistant.

```text
Customer
   │
   ▼
AI Assistant UI
   │
   ▼
Frontend API Request
   │
   ▼
POST /api/ai
   │
   ▼
Express Backend
   │
   ▼
Groq AI
   │
   ▼
AI Response
   │
   ▼
AI Assistant UI
```

The frontend is responsible for collecting the customer's request,
sending it to the backend, and displaying the generated response.

The Groq API key is **never exposed in the frontend**.

---

# 🔄 API Integration

The frontend communicates with the backend using HTTP requests.

```text
React Components
       │
       ▼
API Service / Axios
       │
       ▼
Express REST API
       │
       ▼
JSON Response
       │
       ▼
React State
       │
       ▼
UI Update
```

Main API modules include:

| Feature | API |
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

---

# 🧠 State Management

The application uses React state management and Redux-based architecture
where required.

State management is used for application data such as:

- Authentication state
- User information
- Product information
- Wishlist
- Cart
- Orders
- Application UI state

---

# 🛠️ Technology Stack

### Core

- React.js
- TypeScript
- Vite
- JavaScript

### Routing

- React Router DOM

### State Management

- Redux
- Redux Toolkit

### API

- Axios
- REST APIs

### UI

- Bootstrap
- React Bootstrap
- React Icons
- CSS3
- Responsive Web Design

### Development

- Node.js
- npm
- Git
- GitHub
- VS Code

### Deployment

- Vercel

---

# 📂 Frontend Project Structure

```text
client/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── home/
│   │   ├── ...
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── ...
│   │
│   ├── services/
│   │   └── ...
│   │
│   ├── store/
│   │   └── ...
│   │
│   ├── utils/
│   │   └── ...
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

# 🚀 Run Frontend Locally

## 1. Navigate to client

```bash
cd client
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# 🏭 Production Build

Before deployment, verify that the production build succeeds:

```bash
npm run build
```

The build output is generated in:

```text
client/dist/
```

The `dist` directory should not be committed to Git.

---

# 🔐 Environment Configuration

Frontend environment variables should be stored locally and should
never contain private backend credentials.

Example:

```env
VITE_API_URL=http://localhost:5000
```

For production, configure the corresponding environment variable in
Vercel.

### Important

Never put secrets such as:

```text
GROQ_API_KEY
MONGODB_URI
JWT_SECRET
```

inside the frontend.

These belong on the backend.

---

# 📱 Responsive Design

The frontend is designed to support different screen sizes including:

- Desktop
- Tablet
- Mobile

Responsive layouts are implemented using CSS and Bootstrap utilities.

---

# 🧪 Frontend Testing Checklist

Before deploying frontend changes, verify:

### Authentication

- [ ] User registration works
- [ ] User login works
- [ ] Admin login works
- [ ] Customer goes to customer dashboard
- [ ] Admin goes to admin dashboard
- [ ] Logout works

### Customer

- [ ] Products load
- [ ] Product details work
- [ ] Wishlist works
- [ ] Cart works
- [ ] Orders work
- [ ] AI assistant works

### Admin

- [ ] Admin dashboard loads
- [ ] Product management works
- [ ] Inventory works
- [ ] Customer management works
- [ ] Order management works
- [ ] Sales functionality works

### Production

- [ ] Vercel deployment succeeds
- [ ] Backend API URL is correct
- [ ] CORS works
- [ ] Authentication works
- [ ] API requests return expected responses
- [ ] No sensitive environment variables are exposed

---

# 🚀 Deployment

The frontend is deployed using Vercel.

Production URL:

https://shopsmart-ai-murex.vercel.app

The production frontend communicates with the deployed Render backend.

```text
Vercel
  │
  │ HTTPS
  ▼
React Frontend
  │
  │ REST API
  ▼
Render
  │
  ▼
Node.js + Express
```

---

# 🔒 Security Considerations

The frontend follows these principles:

- Authentication tokens are handled through the application's
  authentication mechanism.
- Backend APIs perform authorization checks.
- Admin functionality is protected.
- Backend secrets are not stored in frontend source code.
- Production API communication uses HTTPS.
- CORS is configured on the backend.

---

# 🔮 Future Frontend Enhancements

- Advanced product filtering
- Product search improvements
- Personalized AI recommendations
- AI-powered product comparison UI
- Improved analytics visualizations
- Better mobile UX
- Loading skeletons
- Error boundaries
- Automated frontend testing
- Progressive Web App support

---

## 👩‍💻 Author

**Bhargavi Urumadla**

Full-Stack Developer | React.js | TypeScript | Node.js | AI

GitHub:

https://github.com/Bhargavi-urumadla

---

## 📄 Related Documentation

For the complete system architecture, backend, database, deployment,
AI functionality, and business logic, see the main project README:

```text
../README.md
```