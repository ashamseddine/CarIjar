const express = require("express");
const userRouter = express.Router({ mergeParams: true });
const UserController = require("../controllers/UserController");
const { requireAuth } = require('../middlewares/requireAuth');

userRouter.get("/:userId", UserController.get);
userRouter.post("/", UserController.create);

userRouter.delete("/:userId", requireAuth, UserController.delete);
userRouter.put("/:userId", requireAuth, UserController.update);

// TODO: authorize admin for following action
userRouter.get("/", UserController.getAll);

module.exports = userRouter;
