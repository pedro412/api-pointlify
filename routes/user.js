const express = require('express');
const UsersService = require('../services/users');
const { createUserSchema } = require('../utils/schemas/users');
const validationHandler = require('../utils/middleware/validationHandler');

const usersApi = app => {
  const router = express.Router();
  app.use('/api/users', router);

  const usersService = new UsersService();

  router.post(
    '/',
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;

      try {
        const createdUser = await usersService.createUser({ user });

        res.status(201).json({
          ok: true,
          createdUser
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = usersApi;
