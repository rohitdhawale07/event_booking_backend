const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
// const eventRoutes = require('./routes/events');
// const bookingRoutes = require('./routes/bookings');

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/bookings', bookingRoutes);

module.exports = app;