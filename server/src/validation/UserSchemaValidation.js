const userJoiSchema = Joi.object({
  first_name: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  last_name: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
  date_of_birth: Joi.date().required(),
  phone_number: Joi.string()
    .regex(/^\d{10}$/)
    .required(),
  location: Joi.string().required(),
  driver_license: Joi.string()
    .regex(/^(\/[\w-]+)+\.(jpg|jpeg|png)$/)
    .required(),
  photo: Joi.string()
    .regex(/^(\/[\w-]+)+\.(jpg|jpeg|png)$/)
    .required(),
  user_type: Joi.string().valid("admin", "user").required(),
  about: Joi.string().allow(""),
});

module.exports = userJoiSchema;
