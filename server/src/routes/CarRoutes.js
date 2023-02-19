const express = require("express");
const userRouter = express.Router({ mergeParams: true });
const CarController = require("../controllers/CarController");
const { requireAuth } = require('../middlewares/requireAuth');

userRouter.get("/:carId", CarController.get);
userRouter.post("/", CarController.insert);

userRouter.delete("/:carId", requireAuth, CarController.delete);
userRouter.put("/:carId", requireAuth, CarController.update);

// TODO: authorize admin for following action
userRouter.get("/", CarController.getAll);

module.exports = userRouter;
