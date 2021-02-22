const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const recipesControllers = require('../controllers/recipes-controllers');

//GETTING ALL THE RECIPES(EXPLORE)
router.get('/explore', recipesControllers.getAllRecipes);

//GETTING A PARTICULAR RECIPE FOR THE GIVEN PARAMETER
router.get('/recipe/:id', recipesControllers.getRecipe);

//GETTING THE RECIPE BY THE USER ID
router.get('/myrecipes/:cid', recipesControllers.getRecipesByUser);

//CREATING A NEW RECIPE
router.post(
  '/addrecipe',
  [
    check('cookTime.hours')
      .isFloat({ min: 0 })
      .withMessage('Please enter a valid value for the hour'),
    check('cookTime.minutes')
      .notEmpty()
      .isFloat({ min: 0, max: 59 })
      .withMessage('Please enter a valid time value for the minute!'),
    check('name')
      .notEmpty()
      .withMessage('Please enter the name of the recipe!'),
    check('image')
      .notEmpty()
      .withMessage('Please provide an image for the recipe'),
    check('description')
      .isLength({ min: 10, max: 400 })
      .withMessage('Please enter a description between 10 to 400 words!'),
    check('keyIngred')
      .isArray({ min: 1 })
      .withMessage('Please enter at-least 1 key-ingredient!'),
    check('ingredients')
      .isArray({ min: 1 })
      .withMessage('Please enter at-least 1 ingredient!'),
    check('procedure')
      .isLength({ min: 30 })
      .withMessage(
        'Please enter the procedure for prepration of at-least 30 words!'
      ),
  ],
  recipesControllers.addNewRecipe
);

//UPDATING A RECIPE
router.patch(
  '/updateRecipe/:id',
  [
    check('cookTime.hours')
      .isFloat({ min: 0 })
      .withMessage('Please enter a valid value for the hour'),
    check('cookTime.minutes')
      .notEmpty()
      .isFloat({ min: 0, max: 59 })
      .withMessage('Please enter a valid time value for the minute!'),
    check('name')
      .notEmpty()
      .withMessage('Please enter the name of the recipe!'),
    check('image')
      .notEmpty()
      .withMessage('Please provide an image for the recipe'),
    check('description')
      .isLength({ min: 10, max: 400 })
      .withMessage('Please enter a description between 10 to 400 words!'),
    check('keyIngred')
      .isArray({ min: 1 })
      .withMessage('Please enter at-least 1 key-ingredient!'),
    check('ingredients')
      .isArray({ min: 1 })
      .withMessage('Please enter at-least 1 ingredient!'),
    check('procedure')
      .isLength({ min: 30 })
      .withMessage(
        'Please enter the procedure for prepration of at-least 30 words!'
      ),
  ],
  recipesControllers.updateRecipe
);

//UPDATING THE LIKE COUNTER FOR A RECIPE
router.patch('/updatelike/:id', recipesControllers.updateLikeValue);

//DELETING A RECIPE
router.delete('/deleterecipe/:id', recipesControllers.deleteRecipe);

module.exports = router;
