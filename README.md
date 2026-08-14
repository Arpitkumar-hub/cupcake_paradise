# 🧁 Cupcake Paradise

> A modern full-stack bakery e-commerce platform built with the MERN stack, featuring Razorpay payments and a complete admin management system.

Cupcake Paradise is a full-stack e-commerce application designed for a modern bakery business. Customers can browse cupcakes, search products, manage their cart, checkout, and make payments using Razorpay Test Mode.

The platform also includes a dedicated admin dashboard for managing products, orders, payments, order statuses, and revenue.

---

## ✨ Features

### 👨‍🍳 Customer Features

- 🧁 Browse cupcakes and bakery products
- 🔍 Search cupcakes
- 🛒 Add products to cart
- ➕ Increase or decrease product quantity
- 🗑️ Remove products from cart
- 💰 Automatic cart total calculation
- 📦 Checkout with customer details
- 💳 Razorpay payment integration
- 🔐 Payment verification
- ✅ Payment success handling
- 🎉 Order success page
- 📱 Responsive user interface
- ✨ Modern bakery-themed UI

### 👨‍💼 Admin Features

- 🔐 Admin authentication
- 📊 Dynamic admin dashboard
- 🧁 Product management
- ➕ Add products
- ✏️ Edit products
- 🗑️ Delete products
- 🔍 Search products
- 📦 Order management
- 👤 Customer order information
- 💳 Payment status tracking
- 🔄 Order status management
- 💰 Dynamic revenue calculation
- 📈 Recent orders overview
- 🔃 Dashboard refresh functionality

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Vite
- JavaScript

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- REST API

## Payment

- Razorpay
- Razorpay Checkout
- Razorpay Orders API
- Payment Signature Verification

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

---

# 🏗️ Project Architecture

```text
Cupcake Paradise
│
├── client/                         # React Frontend
│   ├── public/
│   └── src/
│       ├── animations/
│       ├── api/
│       ├── assets/
│       │   ├── cupcakes/
│       │   ├── gallery/
│       │   └── menu/
│       ├── components/
│       │   └── admin/
│       ├── context/
│       ├── pages/
│       │   └── admin/
│       ├── services/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── server/                         # Node.js Backend
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js
│   └── server.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md