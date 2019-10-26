const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required(),
  organization: joi
    .string()
    .max(500)
    .required()
};

module.exports = {
  userIdSchema,
  createUserSchema
};
