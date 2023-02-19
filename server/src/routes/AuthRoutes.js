const express = require("express");
const passport = require("passport");
const authRouter = express.Router({ mergeParams: true });
const UserController = require("../controllers/UserController");


authRouter.post("/signin", passport.authenticate("local"), UserController.signIn);
authRouter.get("/signout", UserController.signOut);
authRouter.post("/signup", UserController.signUp);

module.exports = authRouter;
