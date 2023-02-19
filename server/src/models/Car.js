const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  daily_fee: {
    type: Number,
    required: true,
  },
  seats_number: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  // TODO: figure out all fueltypes and store it in a seperate collection (check schema validator)
  fuel_type: {
    type: String,
    required: true,
  },
  GPS: {
    type: Boolean,
    default: false,
  },
  cylinder_number: {
    type: Number,
    required: true,
  },
  heated_seats: {
    type: Boolean,
    default: false,
  },
  // TODO: choose all categories and make it in a collection (check schema validator)
  category: {
    type: String,
    required: true,
  },
  toll_pass: {
    type: Boolean,
    default: false,
  },
  camera: {
    type: Boolean,
    default: false,
  },
  AUX: {
    type: Boolean,
    default: false,
  },
  AC: {
    type: Boolean,
    default: false,
  },
  USB_charger: {
    type: Boolean,
    default: false,
  },
  USB_input: {
    type: Boolean,
    default: false,
  },
  insurance: {
    type: Boolean,
    default: false,
  },
  bluetooth: {
    type: Boolean,
    default: false,
  },
  leather: {
    type: Boolean,
    default: false,
  },
  max_daily_milage: {
    type: Number,
    required: true,
  },
  passengers_number: {
    type: Number,
    required: true,
  },
  smoking_allowed: {
    type: Boolean,
    default: false,
  },
  pets_allowed: {
    type: Boolean,
    default: false,
  },
  min_rent_days: {
    type: Number,
    required: true,
  },
  in_market: {
    type: Boolean,
    default: false,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // TODO: add map coordinates latitude and longitude
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;