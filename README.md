# 🎉 Event Management System

This project is a **full-stack Event Management system** with:
- A **React.js (TypeScript) frontend** for users and admins.
- A **Node.js + Express + MongoDB backend** with JWT authentication.

Users can **register, log in, book events, and manage their bookings**.  
Admins can **create, edit, delete events, and view all bookings**.

---

# 🖥️ Backend

## 🚀 Tech Stack
- ⚡ Node.js + Express
- 🗄️ MongoDB + Mongoose
- 🔑 JWT Authentication
- 🔒 Bcrypt for password hashing
- 📦 dotenv for environment variables
---

## 📂 Project Structure
```bash
backend/
│── models/         # Mongoose models (User, Event, Booking)
│── routes/         # Routes (auth, events, bookings)
│── controllers/    # Controllers for each feature
│── middleware/     # Auth middleware
│── config/         # MongoDB connection
│── server.js       # Entry point
│── package.json    # Dependencies & scripts

```

---

## ⚙️ Setup & Installation

### Clone the repo
```bash
git clone https://github.com/rohitdhawale07/event_booking_backend.git
cd event_bookin_backend
```

### Install dependencies
```bash
npm install
```
### Configure environment variables
Create a .env file in the frontend root:
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/eventdb
JWT_SECRET=your_jwt_secret_key

```

### Run the development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```
### Preview production build
```bash
npm run preview
```

## 🔑 API Endpoints
### 🔐 Auth
- POST /api/auth/register → Register user
- POST /api/auth/login → Login + token

### 📅 Events
- GET /api/events → Get all events
- POST /api/events (Admin only) → Create event
- PUT /api/events/:id (Admin only) → Update event
- DELETE /api/events/:id (Admin only) → Delete event (only if no bookings exist)

### 🎟️ Bookings
- POST /api/bookings → Book an event
- GET /api/bookings → Get user’s bookings
(Admins can see all bookings)
- DELETE /api/bookings/:id → Cancel booking

## 🛠️ Features
- ✅ JWT Auth with role-based access (Admin/User).
- ✅ Check bookings before deleting an event.
- ✅ Password hashing with bcrypt.
- ✅ Centralized error handling.

### 📦 Deployment
- Use Vercel / Netlify / Railway for hosting.
- Use MongoDB Atlas for production database.

