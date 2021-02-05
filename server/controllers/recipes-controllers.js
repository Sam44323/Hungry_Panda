const { validationResult } = require('express-validator');
const errorCreator = require('../errorCreator/errorCreator');

const Recipe = require('../models/recipes-models');

const getAllRecipes = (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json({ recipes });
    })
    .catch((err) => {
      console.log(err);
      next(
        errorCreator(
          "Can't fetch the recipes now, please try after some moments!"
        )
      );
    });
};

const getRecipe = (req, res, next) => {
  const recipeId = req.params.id;
  Recipe.findById(recipeId)
    .then((recipe) => {
      res.status(200).json({ recipe });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't find the requested recipe!"));
    });
};

const getRecipesByUsers = (req, res, next) => {
  Recipe.find({ creatorId: req.params.cid })
    .then((recipes) => {
      res.status(200).json({ recipes });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't find the recipes for the requested user!"));
    });
};

const addNewRecipe = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      errorCreator(
        'Please enter all the required data for creating a new recipe!'
      )
    );
  }
  const {
    name,
    image,
    cookTime,
    description,
    keyIngred,
    ingredients,
    procedure,
  } = req.body;
  const newRecipe = new Recipe({
    name,
    image,
    cookTime,
    description,
    keyIngred,
    ingredients,
    procedure,
    likedBy: [],
    likes: 0,
    creatorId: 'creator1',
  });
  newRecipe
    .save()
    .then((recipe) => {
      res.status(200).json({ New_recipe: recipe });
    })
    .catch((err) => {
      console.log(err);
      console.log('New Recipe addition error!');
      next(
        errorCreator("Can't create a recipe at this moment! please try again")
      );
    });
};

const updateRecipe = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      errorCreator(
        'Please fill out all the required fields for updating the recipe!'
      )
    );
  }

  Recipe.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { useFindAndModify: true }
  )
    .then(() => {
      res.status(201).json({ message: 'Successfully updated the recipe!' });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't updated the requested recipe at this moment"));
    });
};

const updateLikeValue = (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      const includeCurrUser = recipe.likedBy.includes('creator1');
      if (includeCurrUser) {
        recipe.likedBy = recipe.likedBy.filter((user) => user !== 'creator1');
        recipe.likes -= 1;
      } else {
        recipe.likedBy.push('creator1');
        recipe.likes += 1;
      }
      recipe.save().then((recipe) => {
        res.status(201).json({
          likes: recipe.likes,
          likedBy: recipe.likedBy,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't update the like value, please try again!"));
    });
};

const deleteRecipe = (req, res, next) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted the recipe!' });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't delete the requested recipe!"));
    });
};

exports.getAllRecipes = getAllRecipes;
exports.getRecipe = getRecipe;
exports.getRecipesByUser = getRecipesByUsers;
exports.addNewRecipe = addNewRecipe;
exports.updateRecipe = updateRecipe;
exports.updateLikeValue = updateLikeValue;
exports.deleteRecipe = deleteRecipe;
