const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const eventBookParams ={
    eventId: { isRequired: true },
    seats: { isRequired: true }
}

// User can book seats
router.post('/', validateRequest(eventBookParams), authMiddleware, bookingsController.createBooking);
router.get('/', authMiddleware, bookingsController.getUserBookings);
router.get('/:id', authMiddleware, bookingsController.getBookingById);
router.put('/:id', authMiddleware, bookingsController.updateBooking);

module.exports = router;