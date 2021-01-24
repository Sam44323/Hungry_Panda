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
    check('name').notEmpty().isString(),
    check('email').normalizeEmail().isEmail(),
    check('userName').notEmpty().isString(),
    check('age').isNumeric(),
    check('socialMedia').isArray(),
    check('location').isString().isLength({ min: 1 }),
  ],
  userController.addNewUser
);

//EDITING THE USER DATA
router.patch(
  '/editprofile/:id',
  [
    check('name').notEmpty().isString(),
    check('email').normalizeEmail().isEmail(),
    check('userName').notEmpty().isString(),
    check('age').isNumeric(),
    check('socialMedia').isArray(),
    check('location').isString(),
  ],
  userController.editUserData
);

//LOGGING OUT AN USER
router.post('/logout', userController.logUserOut);

//DELETE USER ACCOUNT
router.delete('/delete-account', userController.deleteUserAccount);

module.exports = router;
