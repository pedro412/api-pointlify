const express = require('express');
const ProductsService = require('../services/products');
const passport = require('passport');
const {
  productIdSchema,
  createProductSchema,
  updateProductSchema
} = require('../utils/schemas/Products');
const validationHandler = require('../utils/middleware/validationHandler');

// JWT
require('../utils/auth/strategies/jwt');

const productsApi = app => {
  const router = express.Router();
  app.use('/api/products', router);

  const productsService = new ProductsService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function(req, res, next) {
      const { category } = req.query;

      try {
        const products = await productsService.getProducts({ category });

        res.status(200).json({
          ok: true,
          products
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ productId: productIdSchema }, 'params'),
    async function(req, res, next) {
      const { productId } = req.params;

      try {
        const product = await productsService.getProduct({ productId });

        res.status(200).json({
          ok: true,
          product
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createProductSchema),
    async (req, res, next) => {
      const { body: product } = req;

      try {
        const createdProduct = await productsService.createProduct({ product });

        res.status(201).json({
          ok: true,
          createdProduct
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ productId: productIdSchema }, 'params'),
    validationHandler(updateProductSchema),
    async function(req, res, next) {
      const { productId } = req.params;
      const { body: product } = req;

      try {
        const updatedProduct = await productsService.updateProduct({
          productId,
          product
        });

        res.status(200).json({
          ok: true,
          updatedProduct
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:productId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ productId: productIdSchema }, 'params'),
    async function(req, res, next) {
      const { productId } = req.params;

      try {
        const deletedProduct = await productsService.deleteProduct({
          productId
        });

        res.status(200).json({
          ok: true,
          deletedProduct
        });
      } catch (err) {
        next(err);
      }
    }
  );
};

module.exports = productsApi;
