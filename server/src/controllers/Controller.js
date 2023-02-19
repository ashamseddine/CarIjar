const responseapi = require("../config/responseapi");

class Controller {
  constructor(service) {
    this.responseapi = responseapi;
    this.service = service;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(req, res, next) {
    try {
      let result = await this.service.get(req.params._id);

      return res
        .status(result.statusCode)
        .send(this.responseapi.success("", result.item, result.statusCode));
    } catch (err) {
      console.log(err.message, "---- controller");
    }
  }

  async getAll(req, res, next) {
    try {
      let result = await this.service.getAll();
      return res
        .status(result.statusCode)
        .send(this.responseapi.success("", result.data, result.statusCode));
    } catch (err) {
      console.log(err.message, "---- controller");
    }
  }

  async insert(req, res, next) {
    try {
      var valid = this.schema.validate(req.body);
      if (valid.error == undefined) {
        let response = await this.service.insert(req.body);

        return res
          .status(response.statusCode)
          .send(responseapi.success("", response.item, response.statusCode));
      } else {
        throw new ValidationFailedException("Validation of sent item failed");
      }
    } catch (err) {
      console.log(err.message, "---- controller");
    }
  }

  async update(req, res, next) {
    try {
      var valid = this.schema.validate(req.body);
      if (valid.error === undefined) {
        const { _id } = req.params;
        let response = await this.service.update(_id, req.body);

        if (response.error) {
          return res
            .status(response.statusCode)
            .send(responseapi.error(response.message, response.statusCode));
        }

        return res
          .status(response.statusCode)
          .send(this.responseapi.success("", response, response.statusCode));
      } else {
        throw new ValidationFailedException("Validation Failed", {
          details: valid.error,
          data: req.body,
        });
      }
    } catch (err) {
      console.log(err.message, "---- controller");
    }
  }

  async delete(req, res, next) {
    try {
      const { _id } = req.params;
      let response = await this.service.delete(_id);

      return res
        .status(response.statusCode)
        .send(this.responseapi.success("", response.item, response.statusCode));
    } catch (err) {
      console.log(err.message, "---- controller");
    }
  }
}

module.exports = Controller;
