const Controller = require("./Controller");
const Car = require("../models/Car");
const CarService = require("../services/CarService");
const carService = new CarService(Car);

class CarController extends Controller {
  constructor(service) {
    super(service);
  }
}

module.exports = new CarController(carService);
