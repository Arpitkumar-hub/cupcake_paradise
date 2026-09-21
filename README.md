# 🧁 Cupcake Paradise

> A modern full-stack bakery e-commerce platform built with the MERN stack, featuring Razorpay payments and a complete admin management system.

Cupcake Paradise is a full-stack e-commerce application designed for a modern bakery business. Customers can browse cupcakes, search products, manage their cart, checkout, and make payments using Razorpay Test Mode.

The platform also includes a dedicated admin dashboard for managing products, orders, payment status, order statuses, and revenue.

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
- 📍 Enter delivery address
- 💳 Razorpay payment integration
- 🔐 Payment signature verification
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

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Vite
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- REST API

### Payment

- Razorpay
- Razorpay Checkout
- Razorpay Orders API
- Payment Signature Verification

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

---

## 🔄 Application Flow

```text
Customer
   │
   ▼
Homepage
   │
   ▼
Browse / Search Products
   │
   ▼
Select Cupcake
   │
   ▼
Add to Cart
   │
   ▼
Shopping Cart
   │
   ▼
Checkout
   │
   ▼
Enter Customer Details
   │
   ▼
Create Razorpay Order
   │
   ▼
Razorpay Checkout
   │
   ▼
Complete Test Payment
   │
   ▼
Backend Payment Verification
   │
   ▼
Save Order in MongoDB
   │
   ▼
Payment Status: Paid
   │
   ▼
Order Success Page
   │
   ▼
Admin Dashboard
