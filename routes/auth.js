const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserSchema } = require('../utils/schemas/users');

const { config } = require('../config');

// Basic strategy
require('../utils/auth/strategies/basic');

const authApi = app => {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UsersService();

  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async error => {
          if (error) {
            next(error);
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, email, organization } = user;

          const payload = {
            sub: id,
            email,
            organization,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15min'
          });

          return res.status(200).json({
            ok: true,
            token,
            user: { id, email, organization }
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;

      const email = user.email;
      const userExist = await usersService.getUser({ email });

      if (userExist) {
        return res.status(400).json({
          ok: false,
          message: 'El correo proporcionado ya esta en uso'
        });
      }

      try {
        const createdUserId = await usersService.createUser({ user });

        res.status(201).json({
          ok: true,
          data: createdUserId,
          message: 'user created'
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = authApi;
