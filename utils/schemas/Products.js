const joi = require('@hapi/joi');

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productNameSchema = joi.string().max(80);
const productPriceSchema = joi.number();
const productImageSchema = joi.string().uri();
const productDescriptionSchema = joi.string().max(300);
const productCategorySchema = joi.string().max(50);

const createProductSchema = {
  name: productNameSchema.required(),
  price: productPriceSchema.required(),
  category: productCategorySchema.required(),
  image: productImageSchema,
  description: productDescriptionSchema
};

const updateProductSchema = {
  name: productNameSchema,
  price: productPriceSchema,
  category: productCategorySchema,
  image: productImageSchema,
  description: productDescriptionSchema
};

module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema
};
