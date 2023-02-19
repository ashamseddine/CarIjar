class Service {
  constructor(model) {
    this.model = model;
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteMany = this.deleteMany.bind(this);
    this.upsert = this.upsert.bind(this);
    this.findOneAndUpdate = this.findOneAndUpdate.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  async get(_id, fields) {
    let item = undefined;
    try {
      if (fields) {
        item = await this.model.findById(_id).select(fields);
      } else {
        item = await this.model.findById(_id);
      }
    } catch (err) {
      console.log(err.message, "---- service");
    }
    if (!item) console.log(err.message, "---- service");
    return {
      error: false,
      statusCode: 200,
      item,
    };
  }

  async findOne(fields) {
    let item = undefined;
    try {
      item = await this.model.findOne({
        $and: fields,
      });

    } catch (err) {
      console.log(err.message, "---- service");
    }
    if (!item) console.log(err.message, "---- service");
    return {
      error: false,
      statusCode: 200,
      item,
    };
  }

  async exist(fields) {
    let item = undefined;
    try {
      item = await this.model.findOne({
        $and: fields,
      });

    } catch (err) {
      console.log(err.message, "---- service");
    }
    if (!item) return false;
    return true;
  }

  async getAll(sort = {}) {
    let items,
      total = undefined;
    try {
      items = await this.model.find().sort(sort);
      total = await this.model.count();
    } catch (err) {
      console.log(err.message, "---- service");
    }

    return {
      error: false,
      statusCode: 200,
      data: items,
      total,
    };
  }

  async insert(data) {
    let item = undefined;
    try {
      item = await this.model.create(data);
    } catch (err) {
      console.log(err.message, "---- service");
    }
    if (item)
      return {
        error: false,
        statusCode: 201,
        item,
      };
    console.log(err.message, "---- service");
  }

  async update(_id, data) {
    let item = undefined;
    try {
      item = await this.model.findByIdAndUpdate(_id, data, { new: true });
    } catch (err) {
      console.log(err.message, "---- service");
    }
    if (!item) console.log(err.message, "---- service");
    return {
      error: false,
      statusCode: 202,
      item,
    };
  }

  async upsert(query, update) {
    const item = await this.model.findOneAndUpdate(query, update, {
      upsert: true,
      new: true,
    });
    if (!item) console.log(err.message, "---- service");

    return {
      error: false,
      statusCode: 200,
      item,
    };
  }

  async findOneAndUpdate(query, update) {
    const item = await this.model.findOneAndUpdate(query, update);
    if (!item) console.log(err.message, "---- service");

    return {
      error: false,
      statusCode: 200,
      item,
    };
  }

  async delete(_id) {
    let item = undefined;
    try {
      item = await this.model.findByIdAndDelete(_id);
    } catch (err) {
      console.log(err.message, "---- service");
    }

    return {
      error: false,
      statusCode: 204,
      message: "No content",
      item: null,
    };
  }

  async deleteMany(fields) {
    let item = undefined;
    try {
      item = await this.model.deleteMany(fields);
    } catch (err) {
      console.log(err.message, "---- service");
    }

    return {
      error: false,
      statusCode: 204,
      message: "No content",
      item: null,
    };
  }
}

module.exports = Service;
