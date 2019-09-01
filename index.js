const express = require('express');

const app = express();

const { config } = require('./config/index');

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(config.port, () => {
  console.log(`listening at http://localhost:${config.port}`);
});
