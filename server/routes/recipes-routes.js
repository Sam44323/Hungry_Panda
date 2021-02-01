const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();
const recipesControllers = require('../controllers/recipes-controllers');

//GETTING ALL THE RECIPES(EXPLORE)
router.get('/explore', recipesControllers.getAllRecipes);

//GETTING A PARTICULAR RECIPE
router.get('/recipe/:id', recipesControllers.getRecipe);

//GETTING THE RECIPE BY THE USER ID
router.get('/myrecipes/:cid', recipesControllers.getRecipesByUser);

//CREATING A NEW RECIPE
router.post(
  '/addrecipe',
  [
    check('name').notEmpty(),
    check('image').notEmpty(),
    check('description').isLength({ min: 6 }),
    check('keyIngred').isArray({ min: 1 }),
    check('ingredients').isArray({ min: 1 }),
    check('procedure').notEmpty(),
    check('cookTime').notEmpty(),
  ],
  recipesControllers.addNewRecipe
);

//UPDATING A RECIPE
router.patch(
  '/updateRecipe/:id',
  [
    check('image').notEmpty(),
    check('name').notEmpty(),
    check('description').isLength({ min: 6 }),
    check('keyIngred').isArray({ min: 1 }),
    check('ingredients').isArray({ min: 1 }),
    check('procedure').notEmpty(),
    check('cookTime').notEmpty(),
  ],
  recipesControllers.updateRecipe
);

//UPDATING THE LIKE COUNTER FOR A RECIPE
router.patch('/updatelike/:id', recipesControllers.updateLikeValue);

//DELETING A RECIPE
router.delete('/deleterecipe/:id', recipesControllers.deleteRecipe);

module.exports = router;
