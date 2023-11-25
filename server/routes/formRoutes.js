// routes/formRoutes.js
const router = require('express').Router();
const { Form, validate } = require('../models/form');

router.post('/submit-form', async (req, res) => {
  try {
    // Validate the form data
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Add your logic for form submission to the database or other actions
    // For demonstration purposes, let's assume you have a Form model
    const formData = await new Form(req.body).save();

    res.status(201).send({ message: 'Form submitted successfully', formData });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
