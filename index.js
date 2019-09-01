const express = require('express');

const app = express();
const { config } = require('./config/index');

const productsApi = require('./routes/products');

const {
  logErrors,
  errorHandler,
  wrapError
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json());

// Routes
productsApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`listening at http://localhost:${config.port}`);
});
