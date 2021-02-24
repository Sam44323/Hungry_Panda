const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const userController = require('../controllers/users-controllers');

//GETTING AN USER'S DATA
router.get('/myprofile/:id', userController.getUserData);

//ADDING A NEW USER(SIGN UP)
router.post(
  '/signup',
  [
    check('name').notEmpty().isString().withMessage('Please enter a name!'),
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter a valid email address!'),
    check('userName')
      .notEmpty()
      .isString()
      .withMessage('Please enter an user-name'),
    check('password')
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage('Please enter a password of at-least 5 characters!'),
    check('age').notEmpty().withMessage('Please enter your age'),
    check('location')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Please enter a city-name!'),
  ],
  userController.addNewUser
);

//EDITING THE USER DATA
router.patch(
  '/editprofile/:id',
  [
    check('name').notEmpty().isString().withMessage('Please enter a name!'),
    check('email')
      .normalizeEmail()
      .isEmail()
      .withMessage('Please enter a valid email address!'),
    check('userName')
      .notEmpty()
      .isString()
      .withMessage('Please enter an user-name'),
    check('age').notEmpty().withMessage('Please enter your age'),
    check('location')
      .isString()
      .isLength({ min: 1 })
      .withMessage('Please enter a city-name!'),
  ],
  userController.editUserData
);

//LOGGING OUT AN USER
router.post('/logout', userController.logUserOut);

//DELETE USER ACCOUNT
router.delete('/delete-account', userController.deleteUserAccount);

module.exports = router;
