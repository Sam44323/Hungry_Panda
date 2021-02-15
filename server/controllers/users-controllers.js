const errorCreator = require('../errorCreator/errorCreator');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/users-models');

const getUserData = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(errorCreator('No such user exists!'));
      }
      res.status(200).json({ user });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't fetch the user data at this moment!"));
    });
};

const addNewUser = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(errorCreator(error.errors[0].msg, 422));
  }
  const {
    name,
    password,
    email,
    userName,
    age,
    socialMedia,
    location,
    image,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(
          errorCreator('An user already exists with this email!', 409)
        );
      }

      //for hashing the entered passoword by user

      bcrypt
        .hash(password, 12)
        .then((password) => {
          const newUser = new User({
            name,
            password,
            email,
            userName,
            age,
            image,
            socialMedia,
            location,
            recipes: [],
            totalLikes: 0,
            totalRecipes: 0,
          });
          return newUser.save();
        })
        .then((user) => {
          res.status(200).json({ newUser: user });
        });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't create a new user at this moment!"));
    });
};

const editUserData = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      errorCreator(
        'Please check all the informations entered or enter all the required informations!'
      )
    );
  }
  User.findByIdAndUpdate(req.params.id, { ...req.body })
    .then(() => {
      res.status(201).json('Successfully updated the user data!');
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't updated the user data at this moment!"));
    });
};

const logUserOut = (req, res, next) => {
  res.status(200).json({ message: 'You are logged out!' });
};

const deleteUserAccount = (req, res, next) => {
  const userId = req.query.uid;
  User.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).json('Your account was deleted!');
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't delete the account at this moment!"));
    });
};

exports.getUserData = getUserData;
exports.addNewUser = addNewUser;
exports.editUserData = editUserData;
exports.logUserOut = logUserOut;
exports.deleteUserAccount = deleteUserAccount;
