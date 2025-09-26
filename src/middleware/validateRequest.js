// Helper for email validation
function isValidEmail(email) {
  // Simple regex; you may want to use a more robust one for production
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Helper for phone validation (10 digits, can be customized)
function isValidPhone(phone) {
  // Accepts only digits, length 10 (modify as needed)
  return /^\d{10}$/.test(phone);
}

module.exports = function(paramsSchema) {
  return (req, res, next) => {
    const body = req.body;

    for (const [key, options] of Object.entries(paramsSchema)) {
      let value = body[key];

      // Required check
      if (options.isRequired && (value === undefined || value === null || value === '')) {
        return res.status(400).json({ error: `${key} is required` });
      }

      // Trim check
      if (options.isTrim && typeof value === 'string') {
        value = value.trim();
        body[key] = value;
        if (options.isRequired && value === '') {
          return res.status(400).json({ error: `${key} cannot be empty` });
        }
      }

      // Email validation
      if (options.isValidEmail && value) {
        if (!isValidEmail(value)) {
          return res.status(400).json({ error: `${key} must be a valid email address` });
        }
      }

      // Phone validation
      if (options.isValidPhone && value) {
        if (!isValidPhone(value)) {
          return res.status(400).json({ error: `${key} must be a valid phone number` });
        }
      }
    }

    next();
  };
};