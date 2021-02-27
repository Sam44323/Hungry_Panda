const errorCreator = require('../errorCreator/errorCreator');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { deleteFiles } = require('../constants/fileFunctions');

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
    if (req.file) {
      deleteFiles(req.file.path.replace(/\\/g, '/'));
    }
    return next(errorCreator(error.errors[0].msg, 422));
  } else if (!req.file) {
    return next(errorCreator('Image is required for creating a recipe', 422));
  }
  const {
    name,
    password,
    email,
    userName,
    age,
    socialMedia,
    location,
  } = req.body;

  const image = req.file.path.replace(/\\/g, '/');

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
            age: JSON.parse(age),
            image,
            socialMedia: JSON.parse(socialMedia),
            location,
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
    if (req.file) {
      deleteFiles(req.file.path.replace(/\\/g, '/'));
    }
    return next(
      errorCreator(
        'Please check all the informations entered or enter all the required informations!'
      )
    );
  } else if (JSON.parse(req.body.age) < 1) {
    return next(errorCreator('Please enter an age!', 422));
  }
  const { name, email, userName, age, socialMedia, location } = req.body;
  const newUser = {
    name,
    email,
    userName,
    age: JSON.parse(age),
    socialMedia: JSON.parse(socialMedia),
    location,
  };

  User.findById(req.params.id)
    .then((user) => {
      if (req.file) {
        deleteFiles(user.image);
        newUser.image = req.file.path.replace(/\\/g, '/');
      }
      return User.findByIdAndUpdate(req.params.id, { ...newUser });
    })
    .then(() => {
      res.status(201).json('Successfully updated the user data!');
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't updated the user data at this moment!"));
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  let userData;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return next(errorCreator('An user with such email is not found!', 401));
      }
      userData = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isValid) => {
      if (!isValid) {
        return next(errorCreator('The password entered is incorrect!', 401));
      }
      //creating a JWT for the logged in user
      const token = jwt.sign(
        {
          email: userData.email,
          userId: userData._id.toString(),
        },
        'HUNGRY_PANDA_JWT_SECRET',
        {
          expiresIn: '1h', // token will become invalid after one hour
        }
      );
      res.status(200).json({ token, userId: userData._id.toString() });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator('Please try to log in after a few moments!', 401));
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
exports.loginUser = loginUser;
exports.logUserOut = logUserOut;
exports.deleteUserAccount = deleteUserAccount;
