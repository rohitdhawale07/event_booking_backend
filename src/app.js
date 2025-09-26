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
// const bookingRoutes = require('./routes/bookings');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
// app.use('/api/bookings', bookingRoutes);

module.exports = app;



// admin token:- 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGQ2Y2FmYjA5MDY1ZDg4ZWMyMGRlM2UiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTg5MDcxODUsImV4cCI6MTc1ODk5MzU4NX0.-j1ADAz9U1TvJeJZTN5wP2HCUcQa3B43C3fwLbGGF-I
// "email":"admin@gmail.com",
// "password":"admin123"

// user token:-
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGQ2Y2VhYzEwYzVlNDI5ZDdiODFhMGUiLCJyb2xlIjoidXNlciIsImlhdCI6MTc1ODkwODA5NywiZXhwIjoxNzU4OTk0NDk3fQ.7bP74v8FymwYeNSEQnJYvLKeDgtxGso56TXpsl7u_tE
// "email":"user@gmail.com",
// "password":"user123"