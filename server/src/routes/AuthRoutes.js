const express = require("express");
const authRouter = express.Router({ mergeParams: true });
const UserController = require("../controllers/UserController");

authRouter.post("/signin", passport.authenticate("local"), UserController.signIn);
authRouter.get("/logout", UserController.signOut);
authRouter.post("/signup", UserController.signUp);

module.exports = authRouter;
