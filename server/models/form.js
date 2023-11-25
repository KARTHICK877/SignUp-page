// models/form.js
const mongoose = require('mongoose');
const Joi = require('joi');

const formSchema = new mongoose.Schema({
  // Define your schema here
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

const Form = mongoose.model('Form', formSchema);

function validateForm(form) {
  const schema = Joi.object({
    age: Joi.number().required(),
    gender: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
  });

  return schema.validate(form);
}

module.exports = {
  Form,
  validate: validateForm,
};
