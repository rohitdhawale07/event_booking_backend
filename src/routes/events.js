const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const validateRequest = require('../middleware/validateRequest');

const createEventParams = {
  title: { isRequired: true, isTrim: true },
  description: { isRequired: true, isTrim: true },
  date: { isRequired: true },
  location: { isRequired: true, isTrim: true },
  capacity: { isRequired: true } 
}

// Only admins can create, edit, delete
router.post('/', validateRequest(createEventParams), authMiddleware, adminMiddleware, eventsController.createEvent);
router.put('/:id', authMiddleware, adminMiddleware, eventsController.updateEvent);
router.delete('/:id', authMiddleware, adminMiddleware, eventsController.deleteEvent);

// Anyone can view events
router.get('/', eventsController.getAllEvents);

// Anyone can view single event by id
router.get('/:id', eventsController.getEventById);

module.exports = router;