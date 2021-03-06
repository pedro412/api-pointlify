const joi = require('@hapi/joi');
const { userIdSchema } = require('./users');
const { productIdSchema } = require('./Products');

const orderIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const orderItemsSchema = joi
  .array()
  .items({ productId: productIdSchema, quantity: joi.number() })
  .min(1);
const orderDateSchema = joi.date().default(Date.now());
const orderTotalSchema = joi.number();

const createOrderSchema = {
  items: orderItemsSchema.required(),
  total: orderTotalSchema.required(), // calculate this on the backend, but it have to be present for if the price changes the total may not change
  date: orderDateSchema,
  userId: userIdSchema // not requiring it for the validation, tho it will be needed on the route itself
};

module.exports = {
  orderIdSchema,
  createOrderSchema
};
