const Booking = require('../models/Booking');
const Event = require('../models/Event');

// User books seats for an event
exports.createBooking = async (req, res) => {
  try {
    const { eventId, seats } = req.body;
    const userId = req.user.userId;

    // Find event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Validate: Cannot book for past events
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({ error: 'Cannot book for past events' });
    }

    // Validate: Cannot book more seats than available
    if (seats > event.remainingSeats) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Create booking
    const booking = new Booking({
      event: event._id,
      user: userId,
      seats
    });
    await booking.save();

    // Decrease remainingSeats
    event.remainingSeats -= seats;
    await event.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update booking (number of seats)
exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.userId;
    const { seats } = req.body;

    // Find booking
    const booking = await Booking.findById(bookingId).populate('event');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Ensure user only updates own booking
    if (booking.user.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const event = booking.event;

    // Business logic: Cannot update to more seats than available
    const seatsDiff = seats - booking.seats; // positive if increasing seats
    if (seatsDiff > event.remainingSeats) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Cannot update booking for past event
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({ error: 'Cannot update booking for past events' });
    }

    // Update booking and event's remainingSeats
    booking.seats = seats;
    event.remainingSeats -= seatsDiff;
    await booking.save();
    await event.save();

    res.json({ message: 'Booking updated', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all booked events for the user
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Populate event details for each booking
    const bookings = await Booking.find({ user: userId }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get booked event by booking ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('event');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Optional: ensure user only accesses own bookings
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};