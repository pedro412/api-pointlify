const express = require('express');
const OrdersService = require('../services/orders');
const passport = require('passport');
const { productIdSchema } = require('../utils/schemas/Products');
const { userIdSchema } = require('../utils/schemas/users');
const { createOrderSchema } = require('../utils/schemas/orders');
const validationHandler = require('../utils/middleware/validationHandler');

// JWT
require('../utils/auth/strategies/jwt');

const ordersApi = app => {
  const router = express.Router();
  app.use('/api/orders', router);

  const ordersService = new OrdersService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const userId = req.user._id;
      try {
        const orders = await ordersService.getOrders(userId);

        res.status(200).json({
          ok: true,
          orders
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createOrderSchema),
    async (req, res, next) => {
      const { body: order } = req;
      const userId = req.user._id;

      order.userId = userId;
      order.date = Date.now();

      try {
        const createdOrderId = await ordersService.createOrder({ order });

        res.status(201).json({
          ok: true,
          createdOrderId
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = ordersApi;
