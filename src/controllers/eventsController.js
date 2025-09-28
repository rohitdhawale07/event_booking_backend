const Event = require('../models/Event');

// Add event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;
    const createdBy = req.user.userId;

    // Set remainingSeats = capacity when creating
    const event = new Event({
      title,
      description,
      date,
      location,
      capacity,
      remainingSeats: capacity,
      createdBy
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit event
exports.updateEvent = async (req, res) => {
  try {
    // Find the event first
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // If capacity is being updated, adjust remainingSeats accordingly
    if (req.body.capacity !== undefined) {
      const newCapacity = req.body.capacity;
      const diff = newCapacity - event.capacity;

      // Increase/decrease remainingSeats only if capacity increased/decreased
      event.remainingSeats = event.remainingSeats + diff;

      // Prevent remainingSeats from going below 0
      if (event.remainingSeats < 0) event.remainingSeats = 0;

      event.capacity = newCapacity;
    }

    // Update other fields from req.body
    if (req.body.title !== undefined) event.title = req.body.title;
    if (req.body.description !== undefined) event.description = req.body.description;
    if (req.body.date !== undefined) event.date = req.body.date;
    if (req.body.location !== undefined) event.location = req.body.location;

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all events 
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get events by event id 
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if(!event){
        return res.status(404).json({error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};