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
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('age').notEmpty().isNumeric(),
    check('socialMedia').isArray(),
    check('location').notEmpty(),
  ],
  userController.addNewUser
);

//EDITING THE USER DATA
router.patch(
  '/editprofile/:id',
  [
    check('name').notEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('age').notEmpty().isNumeric(),
    check('socialMedia').isArray(),
    check('location').notEmpty(),
  ],
  userController.editUserData
);

//UPDATING THE LIKES TO THE USER LIKE VALUE
router.patch('/likevalue/update/:id', userController.updateLikeValue);

//LOGGING OUT AN USER
router.post('/logout', userController.logUserOut);

//DELETE USER ACCOUNT
router.delete('/delete-account', userController.deleteUserAccount);

module.exports = router;
