const express = require('express');

const app = express();
const { config } = require('./config/index');

const productsApi = require('./routes/products');

app.use(express.json());

productsApi(app);

app.listen(config.port, () => {
  console.log(`listening at http://localhost:${config.port}`);
});
