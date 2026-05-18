# 🍽️ Enterprise Food Delivery Backend Architecture

![Node.js](https://img.shields.io/badge/Node.js-v22+-green?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql)
![Sequelize ORM](https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=for-the-badge&logo=sequelize)
![Swagger](https://img.shields.io/badge/Swagger-API_Docs-85EA2D?style=for-the-badge&logo=swagger)

A highly robust, production-grade enterprise backend built for a multi-vendor, multi-role Food Delivery application. Built entirely from the ground up in 15 days, featuring advanced layered architecture, real-time automated background jobs, geospatial driver assignment, and denormalized caching workflows.

---

## 🏛️ System Architecture

The application strictly enforces a **4-Tier Modular Layered Architecture** to ensure clean separation of concerns, scalability, and maintainability:

```
┌────────────────────────────────────────────────────────┐
│                      HTTP / REST                       │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│            Router Layer (Express Routers)              │
│       Input Validation, Middleware, Auth Guards        │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│        Controller Layer (Req/Res orchestration)        │
│       Standard HTTP Status Codes & Error Handling      │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│          Service Layer (Business Logic & Flow)         │
│     Transactions, Calculations, External API calls     │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│      Repository Layer (Database Access via Sequelize)   │
│         SQL Queries, Indexing, and Data Mutation       │
└────────────────────────────────────────────────────────┘
```

---

## ✨ Key Enterprise Features

### 👥 1. Role-Based Access Control (RBAC) & Multi-Role System
Seamless multi-tenant user profile management catering to 5 distinct system roles:
- **Admin**: Full platform management, commission settings, promo codes, and driver oversight.
- **Sub-Admin / Dispatcher**: Role-restricted access with granular permissions for order management.
- **Vendor / Restaurant**: Product management, pre-order approvals, and live vendor-order tracking.
- **Driver / Courier**: Geospatial location updates, online/offline toggling, and instant order assignment.
- **Customer**: Live order tracking, payments, meal exploration, and reviews.

### 🗺️ 2. Automated Driver Assignment (Geospatial Haversine)
- Runs an automated background cron job every 5 minutes (`AutoAssignDriver`).
- Evaluates all unassigned live orders in `ready` or `accepted` status.
- Applies the mathematical **Haversine Distance Formula** between customer delivery coordinates and active online drivers to dynamically assign the closest courier.

### ⚡ 3. High-Performance Denormalized Caching (Popular Meals)
- Intercepts successful order placements via atomic hooks (`orderTracker`).
- Maintains a highly optimized, denormalized snapshot table (`PopularMeal`) for lightning-fast customer meal exploration without expensive SQL `GROUP BY` aggregations.

### 🕒 4. Scheduled Background Workers & Cloud Functions
Powered by `node-cron`, executing periodic system maintenance autonomously:
- **`preOrderReminder` (10m)**: Identifies accepted pre-orders due within 1 hour, alerts the restaurant, and automatically transitions them into active live orders.
- **`updateDeliveryCharges` (5m)**: Manages time-sensitive delivery charge overrides (surge pricing / discounts) and automatically reverts them upon schedule expiration.
- **`scheduleEngagingMessages` (5m)**: Evaluates marketing campaigns and dispatches simulated push notifications across non-admin user bases with automatic recurrence handling (daily, weekly, monthly).
- **`expirePromoCodes` (Daily)**: Audits active promotional codes at midnight and transitions past-due vouchers to `Expired`.

### 💵 5. Payment Module & Atomic Recalculations
- Complete transactional tracking linking orders to secure payment gateways with instant refund capabilities.
- **Event-Driven Recalculation Hook**: Instantly triggers batch updates across all restaurant product prices whenever platform commission percentages are modified by administrators.

---

## 📦 Database & Data Modeling

Built on **MySQL** utilizing **Sequelize ORM** with over **20 interconnected models**:
- Optimized with composite database indexes on frequently queried fields (`userId` + `createdAt`, `status` + `isRead`, etc.).
- Utilizes `UUIDV4` primary keys for secure, unpredictable resource identification.
- Employs strict Foreign Key constraints (`ON DELETE CASCADE`) to preserve relational data integrity across Orders, Payments, Products, and Reviews.

---

## 📖 Interactive API Documentation

Fully documented according to the OpenAPI specification.
You can explore and test all available endpoints interactively via Swagger UI.

- **Local Swagger UI Endpoint**: `http://localhost:3000/api-docs`
- **Swagger JSON Output**: `swagger_output.json`

---

## 🚀 Installation & Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v22 or higher)
- [MySQL Server](https://www.mysql.com/) running locally or in the cloud.

### 1. Clone the repository
```bash
git clone https://github.com/shresthbhadana/food-delivery-backend.git
cd food-delivery-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and configure your credentials:
```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=food_delivery
JWT_SECRET=your_super_secret_jwt_key
FIREBASE_SERVICE_ACCOUNT_KEY=path_to_firebase_key.json
```

### 4. Run the Server
For development mode with automatic restart:
```bash
npm run dev
```
For production execution:
```bash
npm start
```

Upon successful startup, Sequelize will automatically synchronize your database schemas and generate default administrative credentials.

---

## 🛠️ Technology Stack
- **Runtime Environment**: Node.js v22
- **Web Framework**: Express.js
- **Database**: MySQL Server
- **ORM**: Sequelize ORM v6
- **Authentication**: Firebase Admin SDK & JWT
- **Cron Jobs**: Node-Cron
- **API Documentation**: Swagger UI Express
- **Logging**: Custom Winston / Console Logger

---
*Built with ❤️ for a seamless, scalable Food Delivery experience.*
