const express = require('express');

const app = express();
const { config } = require('./config/index');

const authApi = require('./routes/auth');
const productsApi = require('./routes/products');
const ordersApi = require('./routes/orders');

const {
  logErrors,
  errorHandler,
  wrapError
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

// Routes
productsApi(app);
authApi(app);
ordersApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`listening at -- http://localhost:${config.port}`);
});
