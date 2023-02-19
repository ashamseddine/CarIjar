const Controller = require("./Controller");
const UserSchemaValidator = require("../validation/UserSchemaValidation");
const User = require("../models/User");
const UserService = require("../services/UserService");
const { generateToken } = require("../helpers/utils/Authentication");
const SchemaValidator = require("../helpers/utils/SchemaValidator");
const UserJoiSchema = require("../validation/UserSchemaValidation");

const userService = new UserService(User);

class UserController extends Controller {
  constructor(service) {
    super(service, UserSchemaValidator);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async signIn(req, res, next) {
    try {
      const token = generateToken(req.user.id);

      return res
        .status(200)
        .send(
          this.responseapi.success("Token successfully created", token, 200)
        );
    } catch (err) {
      return res.status(500).send(this.responseapi.error(err));
    }
  }

  async signOut(req, res, next) {
    try {
      req.logout();
      return res
        .status(200)
        .send(this.responseapi.success("Signed out successfully", [], 200));
    } catch (err) {
      return res.status(500).send(this.responseapi.error(err));
    }
  }

  async signUp(req, res) {
    try {
      const { error } = SchemaValidator(UserJoiSchema, req.body);
      if (error) return res.statusCode(400).send(responseapi.error(error));

      const { email, password } = req.body;

      const existingUser = await this.service.exist({ email });
      if (existingUser) {
        return res
          .status(400)
          .send(this.responseapi.error(new Error("Email already registered")));
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const data = req.body;
      data.password = hashedPassword;
      const newUser = await this.service.insert(data);

      return res
        .status(201)
        .send(
          this.responseapi.success(
            "User successfully created",
            newUser.email,
            201
          )
        );
    } catch (error) {
      return res.status(500).send(this.responseapi.error(err));
    }
  }
}
module.exports = new UserController(userService);
