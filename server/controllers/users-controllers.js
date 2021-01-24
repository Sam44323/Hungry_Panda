const uuid = require('uuid');
const errorCreator = require('../errorCreator/errorCreator');
const { validationResult } = require('express-validator');

let DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Sam Henrick',
    email: 'test@test.com',
    age: 17,
    location: 'Geneva',
    socialMedia: ['insta', 'fb', 'twitter'],
    recipes: [
      {
        id: 'recipe1',
        name: 'Burritto',
      },
      {
        id: 'recipe2',
        name: 'tikka',
      },
      {
        id: 'recipe3',
        name: 'tacos',
      },
      {
        id: 'recipe4',
        name: 'lasagna',
      },
    ],
    totalLikes: 16,
    totalRecipes: 4,
  },
  {
    id: 'u2',
    name: 'Max Schwarz',
    email: 'max@email.com',
    age: 27,
    location: 'Berlin',
    socialMedia: ['insta', 'twitter'],
    recipes: [
      {
        id: 'recipe1',
        name: 'Burritto',
      },
      {
        id: 'recipe2',
        name: 'dahi',
      },
    ],
    totalLikes: 5,
    totalRecipes: 2,
  },
];

const getUserData = (req, res, next) => {
  const findIndex = DUMMY_USERS.findIndex((user) => user.id === req.params.id);
  if (findIndex < 0) {
    return next(errorCreator('No such user found in the database!'));
  }
  res.status(200).json({ userData: DUMMY_USERS[findIndex] });
};

const addNewUser = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      errorCreator(
        'Please enter all the required informations needed for creating an account!'
      )
    );
  }
  const { name, email, age, location, socialMedia } = req.body;
  const userExistsIndex = DUMMY_USERS.findIndex((user) => user.email === email);
  if (userExistsIndex >= 0) {
    return next(errorCreator('An account already exists with this email!'));
  }
  const newUser = {
    id: uuid.v4(),
    name,
    email,
    age,
    location,
    socialMedia,
    recipes: [],
    totalLikes: 0,
    totalRecipes: 0,
  };
  DUMMY_USERS.push(newUser);
  res.status(200).json({ createdUser: newUser });
};

const editUserData = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      errorCreator('Please enter all the required fields for updating!')
    );
  }
  const userIndex = DUMMY_USERS.findIndex((user) => user.id === req.params.id);
  if (userIndex < 0) {
    return next(errorCreator('No user with the provided id exists!'));
  }
  const { name, email, age, location, socialMedia } = req.body;
  const newUser = {
    name,
    email,
    age,
    location,
    socialMedia,
  };
  DUMMY_USERS[userIndex] = { ...DUMMY_USERS[userIndex], ...newUser };
  res.status(200).json({ editedUser: DUMMY_USERS[userIndex] });
};

const updateLikeValue = (req, res, next) => {
  const userIndex = DUMMY_USERS.findIndex((user) => user.id === req.params.id);
  if (userIndex < 0) {
    return next(errorCreator("Can't find the requested user!"));
  }
  if (req.query.incr) {
    DUMMY_USERS[userIndex].totalLikes += 1;
  } else {
    DUMMY_USERS[userIndex].totalLikes -= 1;
  }
  console.log(DUMMY_USERS[userIndex]);
  res.status(200).json({ updatedUserValue: DUMMY_USERS[userIndex] });
};

const logUserOut = (req, res, next) => {
  res.status(200).json({ message: 'Successfully logged out!' });
};

const deleteUserAccount = (req, res, next) => {
  const userId = req.query.uid;
  if (!userId) {
    return next(
      errorCreator("Can't delete the user currently, please try again!")
    );
  }
  DUMMY_USERS = DUMMY_USERS.filter((user) => user.id !== userId);
  res.status(200).json({ updatedUsers: DUMMY_USERS });
};

exports.getUserData = getUserData;
exports.addNewUser = addNewUser;
exports.editUserData = editUserData;
exports.updateLikeValue = updateLikeValue;
exports.logUserOut = logUserOut;
exports.deleteUserAccount = deleteUserAccount;
