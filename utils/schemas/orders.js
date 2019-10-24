const joi = require('@hapi/joi');
const { userIdSchema } = require('./users');
const { productIdSchema } = require('./Products');

const orderIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const orderItemsSchema = joi.array(productIdSchema).min(1);
const orderDateSchema = joi.date().default(Date.now());
const orderTotalSchema = joi.number();

const createOrderSchema = {
  items: orderItemsSchema.required(),
  date: orderDateSchema.required(),
  orderTotalSchema: orderTotalSchema.required(),
  userId: userIdSchema // not requiring it for the validation, tho it will be needed on the route itself
};

module.exports = {
  orderIdSchema,
  createOrderSchema
};
