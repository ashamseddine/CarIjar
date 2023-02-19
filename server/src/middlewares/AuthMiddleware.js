const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models");
const UserService = require("../services/UserService");
const userService = new UserService(User);

const initializeMiddleware = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.findOne({ email: email });
          if (!user.item) {
            return done(null, false, { message: "Incorrect email." });
          }
          console.log("debug user", user.item)
          const isMatch = await bcrypt.compare(password, user.item.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }
          console.log("debug isMatch",isMatch)
          return done(null, user.item);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.get(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializeMiddleware;
