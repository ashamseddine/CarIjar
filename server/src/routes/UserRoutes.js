const express = require('express');
const userRouter = express.Router({mergeParams: true});
const UserController = require('../controllers/UserController')

userRouter.get("/:userId", UserController.get);
userRouter.post("/", UserController.create);

// TODO: authorize the user for put and delete requests
userRouter.delete("/:userId", UserController.delete);
userRouter.put("/:userId", UserController.update);

// TODO: authorize admin for following action
userRouter.get("/", UserController.getAll);

module.exports = userRouter;