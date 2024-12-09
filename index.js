const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const asyncError = require('express-async-errors');

const db = require('./db');

const employesRouter = require('./controlers/em.controlers');

app.use(bodyParser.json());

app.use('/api/employes', employesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send('Something went wrong');
});

db.query('SELECT 1')
  .then(() => {
    console.log('Connected MySQL DB to successfully');

    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MySQL DB', err);
  });
