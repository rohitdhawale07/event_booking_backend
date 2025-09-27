const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const cors = require('cors');

// Allow all origins
app.use(cors());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Event Booking App!');
});

// Import routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

module.exports = app;



// admin token:- 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGQ2Y2FmYjA5MDY1ZDg4ZWMyMGRlM2UiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTg5MDcxODUsImV4cCI6MTc1ODk5MzU4NX0.-j1ADAz9U1TvJeJZTN5wP2HCUcQa3B43C3fwLbGGF-I
// "email":"admin@gmail.com",
// "password":"admin123"

// user token:-
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGQ2Y2VhYzEwYzVlNDI5ZDdiODFhMGUiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODkwODA5NywiZXhwIjoxNzU4OTk0NDk3fQ.7bP74v8FymwYeNSEQnJYvLKeDgtxGso56TXpsl7u_tE
// "email":"user@gmail.com",
// "password":"user123"


// ok so now backend is ready as u have seen in above repo, i want to create front end for my event booking app using vite react and typescript,
// so i will guide u as below,
// so firsly there is login page which will take email and password and hit login api,
// if user is new there is register button below for registering that user, register post api will tke name, email, mobile, password,
// after this there will be two types of users such as normal user and admin, i have created that admin from backend , so there will be only normal users registering will be there, so next after registering user he will be redicredt to login page, then after successfull login he should be redirected to dahsboard where on dashboard on right upper corner there will be addevet button and logout button also , so add event pop up or drwaer which will take title, description,date,location,capacity and that createdBy will be stored from beackend,
// so after adding successful event it close popup or drawer and table will be refreshed and added event will be seen there ,
// in tabele there will two options also that edit event and delete event icons,
// delete will take one id in params and update will be put method it will take params id and data to be updated in payload,
// and there will front end validations also

// Here’s a complete backend API report for your event booking app, covering admin/user logic, authentication, endpoints, request/response formats, and special requirements.

// 1. User Roles & Logic
// Admin
// Can create, update, delete events.
// Access to all events CRUD endpoints.
// Normal User
// Can view events.
// Can book seats for an event (with business logic: not for past events, not exceeding available seats).
// Can view/cancel/update their bookings.
// Role is set in the User model (e.g., role: "admin" or role: "user"). Admin checks are enforced via middleware.

// 2. Authentication Endpoints
// Register:
// POST /auth/register
// Body:

// JSON
// {
//   "name": "User Name",
//   "email": "user@example.com",
//   "mobile": "1234567890",
//   "password": "password123"
// }
// Response:

// Success: { "message": "Registration successful" }
// Error: { "error": "Email already exists" }
// Login:
// POST /auth/login
// Body:

// JSON
// {
//   "email": "user@example.com",
//   "password": "password123"
// }
// Response:

// Success: { "token": "JWT_TOKEN", "user": { ...userObject } }
// Error: { "error": "Invalid credentials" }
// 3. Events CRUD Endpoints
// Get events:
// GET /events

// Returns array of event objects.
// Get event by ID:
// GET /events/:id

// Returns single event object.
// Add event:
// POST /events
// Admin only (JWT required)
// Body:

// JSON
// {
//   "title": "Conference",
//   "description": "Annual event",
//   "date": "2025-10-20",
//   "location": "Pune",
//   "capacity": 100
// }
// remainingSeats is set to capacity by backend.
// createdBy is set from JWT user.
// Update event:
// PUT /events/:id
// Admin only
// Body:

// Any updatable fields (same as create).
// Delete event:
// DELETE /events/:id
// Admin only

// 4. Booking Endpoints (User)
// Book event:
// POST /bookings
// Body:

// JSON
// {
//   "eventId": "eventMongoId",
//   "seats": 3
// }
// Business Logic:

// Cannot book for past events.
// Cannot book more than remainingSeats.
// On booking, backend decrements remainingSeats in Event.
// Get all bookings for user:
// GET /bookings

// Returns array of booking objects for the logged-in user.
// Get booking by ID:
// GET /bookings/:id

// Returns booking object (with event info).
// Update booking:
// PUT /bookings/:id
// Body:

// JSON
// {
//   "seats": 2
// }
// Cannot update booking for past events.
// Cannot update to more seats than available.
// Cancel booking (optional):
// DELETE /bookings/:id

// 5. Authentication Method
// JWT tokens are used.
// On login, client receives a JWT.
// All protected endpoints must send JWT as:
// Authorization: Bearer <token>
// Backend extracts user info from JWT for access control.
// Token Storage:

// Store JWT in localStorage or HttpOnly cookie (localStorage recommended for SPA).
// 6. Request/Response Format
// Login API request:
// { email, password }
// Login API response:
// { token, user }
// Register API request:
// { name, email, mobile, password }
// Register API response:
// { message } or { error }
// Event object structure:
// JSON
// {
//   "_id": "eventMongoId",
//   "title": "Conference",
//   "description": "Annual event",
//   "date": "2025-10-20T00:00:00.000Z",
//   "location": "Pune",
//   "capacity": 100,
//   "remainingSeats": 97,
//   "createdBy": "adminMongoId"
// }
// Booking object structure:
// JSON
// {
//   "_id": "bookingMongoId",
//   "event": { ...eventObject },
//   "user": "userMongoId",
//   "seats": 2,
//   "bookedAt": "2025-09-27T15:55:00.000Z"
// }
// 7. Special Requirements & Middleware
// CORS:

// Enable CORS for frontend domain (using cors npm package).
// Example:
// js
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// Middleware:

// authMiddleware: Checks JWT for protected endpoints.
// adminMiddleware: Checks user role for admin endpoints.
// Error response format:

// Always return error as:
// { "error": "Description" }
// Headers required:

// Authorization: Bearer <token> for protected endpoints.
// 8. General Notes
// All dates should be ISO format (YYYY-MM-DD or ISO string).
// All endpoints return JSON.
// All errors return { error: "message" }.