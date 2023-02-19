const { responseapi } = require("../../config/reponseapi");

const SchemaValidator = (schema, data) => {
  const { error } = schema.validate(data);
  if (error) return error;
  return null;
}

module.exports = SchemaValidator;