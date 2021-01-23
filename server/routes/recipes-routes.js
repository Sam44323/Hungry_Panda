const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const recipesControllers = require('../controllers/recipes-controllers');

//GETTING ALL THE RECIPES(EXPLORE)
router.get('/explore', recipesControllers.getAllRecipes);

//GETTING A PARTICULAR RECIPE
router.get('/:id', recipesControllers.getRecipe);

//GETTING THE RECIPE BY THE USER ID
router.get('/myrecipes/:cid', recipesControllers.getRecipesByUser);

//CREATING A NEW RECIPE
router.post(
  '/addrecipe',
  [
    check('image').not().isEmpty(),
    check('name').not().isEmpty(),
    check('description').isLength({ min: 6 }),
    check('kIngrd').isArray({ min: 1 }),
    check('creator').not().isEmpty(),
  ],
  recipesControllers.addNewRecipe
);

//UPDATING A RECIPE
router.patch(
  '/updateRecipe/:id',
  [
    check('image').not().isEmpty(),
    check('name').not().isEmpty(),
    check('description').isLength({ min: 6 }),
    check('kIngrd').isArray({ min: 1 }),
    check('creator').not().isEmpty(),
  ],
  recipesControllers.updateRecipe
);

//INCREASING THE LIKE COUNTER FOR A RECIPE
router.patch('/updatelike/incr/:id', recipesControllers.increaseLikeValue);

//DECREASING THE LIKE COUNTER FOR A RECIPE
router.patch('/updatelike/decr/:id', recipesControllers.decreaseLikeValue);

//DELETING A RECIPE
router.delete('/deleterecipe/:id', recipesControllers.deleteRecipe);

module.exports = router;
