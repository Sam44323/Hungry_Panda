const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.json({ extended: false }));

const recipesRoutes = require('./routes/recipes-routes');
const usersRoutes = require('./routes/user-routes');

app.use('/hungrypandaAPI/recipes', recipesRoutes);
app.use('/hungrypandaAPI/users', usersRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' });
});

app.listen(5000, () => {
  console.log('Connected to the server!');
});
