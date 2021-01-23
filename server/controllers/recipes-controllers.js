const { validationResult } = require('express-validator');
const uuid = require('uuid');
const errorCreator = require('../errorCreator/errorCreator');

let DUMMY_RECIPES = [
  {
    id: 'id1',
    recipeImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4TlH5yfHqF_77nR0kZNWwwVhKH-tm3slhQ&usqp=CAU',
    recipeName: 'burritos',
    recipeDescription: "This is one of the best buritto you'll ever try",
    keyIngred: ['beaf', 'black-beans', 'sour cream', 'taco'],
    cookingTime: {
      hours: 1,
      mins: 14,
    },
    loves: 3,
    creator: 'c1',
  },
  {
    id: 'id2',
    recipeImage:
      'https://spng.subpng.com/20191212/ijj/transparent-fried-chicken-grill-chick5e15adeca336d9.7647389115784790846685.jpg',
    recipeName: 'chicken tikka',
    recipeDescription: 'The Indian legendary dish that everyone should try!',
    keyIngred: ['yoghurt', 'lemon juice', 'fresh ginger', 'black pepper'],
    cookingTime: {
      hours: 0,
      mins: 45,
    },
    loves: 1,
    creator: 'c3',
  },
  {
    id: 'id3',
    recipeImage: 'This is the third recipe for the collection',
    recipeName: 'Another Recipe',
    recipeDescription: 'This is the description for another recipe',
    keyIngred: ['ing1', 'ing2', 'ing3'],
    cookingTime: {
      hours: 0,
      mins: 41,
    },
    loves: 9,
    creator: 'c3',
  },
];
const getAllRecipes = (req, res) => {
  res.status(200).json({ recipes: DUMMY_RECIPES });
};

const getRecipe = (req, res, next) => {
  const recipeId = req.params.id;
  const findIndex = DUMMY_RECIPES.findIndex((recipe) => recipe.id === recipeId);
  if (findIndex < 0) {
    return next(errorCreator('Recipe with such id does not exist!'));
  }
  res.status(200).json({ recipe: DUMMY_RECIPES[findIndex] });
};

const getRecipesByUsers = (req, res, next) => {
  const userRecipes = DUMMY_RECIPES.filter(
    (recipe) => recipe.creator === req.params.cid
  );
  if (userRecipes.length < 0) {
    return next(errorCreator("You haven't created any recipes yet!"));
  }
  res.status(200).json({ recipes: userRecipes });
};

const addNewRecipe = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      errorCreator(
        'Please provide all the informations required for adding the recipe!'
      )
    );
  }
  const { image, name, description, kIngrd, time, creator } = req.body;
  const newRecipe = {
    id: uuid.v4(),
    recipeName: name,
    recipeImage: image,
    recipeDescription: description,
    keyIngred: [...kIngrd],
    cookingTime: time,
    loves: 0,
    creator,
  };
  DUMMY_RECIPES.push(newRecipe);
  res.status(201).json({ Newrecipe: newRecipe });
};

const updateRecipe = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      errorCreator(
        'Please fill out all the required fiels for updating the recipe!'
      )
    );
  }
  const { name, description, image, kIngrd, time } = req.body;
  const recipeIndex = DUMMY_RECIPES.findIndex(
    (recipe) => recipe.id === req.params.id
  );
  if (recipeIndex < 0) {
    return next(
      errorCreator("Can't find the recipe you requested for updation!")
    );
  }
  const recipe = DUMMY_RECIPES[recipeIndex];
  const updatedRecipe = {
    recipeName: name,
    recipeDescription: description,
    recipeImage: image,
    keyIngred: [...kIngrd],
    cookingTime: { ...time },
  };
  DUMMY_RECIPES[recipeIndex] = { ...recipe, ...updatedRecipe };
  res.status(200).json({ updatedRecipe: DUMMY_RECIPES[recipeIndex] });
};

const increaseLikeValue = (req, res) => {
  const findIndex = DUMMY_RECIPES.findIndex(
    (recipe) => recipe.id === req.params.id
  );
  DUMMY_RECIPES[findIndex].loves += 1;
  res.status(200).json({ updatedRecipe: DUMMY_RECIPES[findIndex] });
};

const decreaseLikeValue = (req, res, next) => {
  const findIndex = DUMMY_RECIPES.findIndex(
    (recipe) => recipe.id === req.params.id
  );
  DUMMY_RECIPES[findIndex].loves -= 1;
  res.status(200).json({ updatedRecipe: DUMMY_RECIPES[findIndex] });
};

const deleteRecipe = (req, res, next) => {
  if (DUMMY_RECIPES.findIndex((recipe) => recipe.id === req.params.id) < 0) {
    return next(
      errorCreator("The requested recipe with such id doesn't exist!")
    );
  }
  DUMMY_RECIPES = DUMMY_RECIPES.filter((recipe) => recipe.id !== req.params.id);
  res.status(200).json({ updatedrecipes: DUMMY_RECIPES });
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipe = getRecipe;
exports.getRecipesByUser = getRecipesByUsers;
exports.addNewRecipe = addNewRecipe;
exports.updateRecipe = updateRecipe;
exports.increaseLikeValue = increaseLikeValue;
exports.decreaseLikeValue = decreaseLikeValue;
exports.deleteRecipe = deleteRecipe;
