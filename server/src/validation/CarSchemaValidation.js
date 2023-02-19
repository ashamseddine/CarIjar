const Joi = require("joi");

const carSchemaValidator = Joi.object({
  brand: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  color: Joi.string().required(),
  daily_fee: Joi.number().min(0).required(),
  seats_number: Joi.number().integer().min(1).max(50).required(),
  transmission: Joi.string().valid("Automatic", "Manual").required(),
  fuel_type: Joi.string()
    .valid("Petrol", "Diesel", "Hybrid", "Electric", "Other")
    .required(),
  GPS: Joi.boolean().required(),
  cylinder_number: Joi.number().integer().min(1).max(16).required(),
  heated_seats: Joi.boolean().required(),
  category: Joi.string()
    .valid(
      "Compact",
      "Midsize",
      "Full-size",
      "Luxury",
      "SUV",
      "Truck",
      "Van",
      "Other"
    )
    .required(),
  toll_pass: Joi.boolean().required(),
  camera: Joi.boolean().required(),
  AUX: Joi.boolean().required(),
  AC: Joi.boolean().required(),
  USB_charger: Joi.boolean().required(),
  USB_input: Joi.boolean().required(),
  insurance: Joi.boolean().required(),
  bluetooth: Joi.boolean().required(),
  leather: Joi.boolean().required(),
  max_daily_milage: Joi.number().min(0).required(),
  passengers_number: Joi.number().integer().min(1).max(50).required(),
  smoking_allowed: Joi.boolean().required(),
  pets_allowed: Joi.boolean().required(),
  min_rent_days: Joi.number().integer().min(1).max(365).required(),
  in_market: Joi.boolean().required(),
  locationId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  owner_id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  // TODO: add map coordinates longitude and latitude
});

module.exports = carSchemaValidator;
