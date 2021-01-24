const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyparser.json({ extended: false }));

const MONGODB_URI =
  'mongodb+srv://suranjan_mern:suranjan_mern@cluster0.ncbfj.mongodb.net/hungryPanda?retryWrites=true&w=majority';

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

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    app.listen(5000, () => {
      console.log('Connected to the server!');
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Can't connect to the database");
  });
