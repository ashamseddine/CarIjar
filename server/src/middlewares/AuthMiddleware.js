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
        emailField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userService.findOne({ email });
          if (!user) {
            return done(null, false, { message: "Incorrect email." });
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
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
