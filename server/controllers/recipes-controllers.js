const { validationResult } = require('express-validator');
const errorCreator = require('../errorCreator/errorCreator');
const { ObjectId } = require('mongodb');
const User = require('../models/users-models');
const { ADD_LIKES, REMOVE_LIKES } = require('../constants/server-constants');

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
    .populate('creatorId', 'userName')
    .exec((err, recipe) => {
      if (err) {
        console.log(err);
        return next(errorCreator("Can't find the requested recipe!"));
      }
      res.status(200).json({ recipe });
    });
};

const getRecipesByUsers = (req, res, next) => {
  User.findById(req.params.cid)
    .then((user) => {
      if (!user) {
        return next(
          errorCreator("Can't find the recipes for the requested user!", 400)
        );
      }
      return Recipe.find({ creatorId: req.params.cid });
    })
    .then((recipes) => {
      res.status(200).json({ recipes });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't find the recipes for the requested user!", 400));
    });
};

const addNewRecipe = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(errorCreator(error.errors[0].msg, 422));
  } else if (
    JSON.parse(req.body.keyIngred).length === 0 ||
    JSON.parse(req.body.ingredients).length === 0
  ) {
    return next(errorCreator('Please enter at-least 1 ingredients!', 422));
  } else if (!req.file) {
    return next(errorCreator('Image is required for creating a recipe', 422));
  }

  const {
    name,
    cookTime,
    description,
    keyIngred,
    ingredients,
    procedure,
  } = req.body;
  const image = req.file.path.replace(/\\/g, '/');
  const newRecipe = new Recipe({
    name,
    image,
    cookTime: JSON.parse(cookTime),
    description,
    keyIngred: JSON.parse(keyIngred),
    ingredients: JSON.parse(ingredients),
    procedure,
    likedBy: [],
    likes: 0,
    creatorId: ObjectId('6036818291a2143a8c40ba34'),
  });
  newRecipe
    .save()
    .then((recipe) => {
      return User.findById('6036818291a2143a8c40ba34').then((user) => {
        user.recipes.push(recipe._id);
        user.totalRecipes++;
        return user.save();
      });
    })
    .then(() => {
      res.status(200).json({ message: 'Created a new recipe!' });
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
    return next(errorCreator(error.errors[0].msg, 422));
  } else if (
    JSON.parse(req.body.keyIngred).length === 0 ||
    JSON.parse(req.body.ingredients).length === 0
  ) {
    return next(errorCreator('Please enter at-least 1 ingredients!', 422));
  }
  const updatedRecipe = {
    name: req.body.name,
    cookTime: JSON.parse(req.body.cookTime),
    description: req.body.description,
    keyIngred: JSON.parse(req.body.keyIngred),
    ingredients: JSON.parse(req.body.ingredients),
    procedure: req.body.procedure,
  };
  if (req.file) {
    updateRecipe.image = req.file.path.replace(/\\/g, '/');
  }
  Recipe.findByIdAndUpdate(req.params.id, updatedRecipe)
    .then(() => {
      res.status(200).json({ message: 'Updated the recipe!' });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't updated the requested recipe at this moment"));
    });
};

const updateUser = (updateType) => {
  console.log(updateType);
  User.findById('6036818291a2143a8c40ba34').then((user) => {
    if (updateType === ADD_LIKES) {
      user.totalLikes++;
    } else if (updateType === REMOVE_LIKES) {
      user.totalLikes--;
    }
    return user.save();
  });
};

const updateLikeValue = (req, res) => {
  let type;
  Recipe.findById(req.params.id)
    .then((recipe) => {
      const includeCurrUser = recipe.likedBy.includes(
        '6036818291a2143a8c40ba34'
      );
      if (includeCurrUser) {
        recipe.likedBy = recipe.likedBy.filter(
          (user) => user !== '6036818291a2143a8c40ba34'
        );
        recipe.likes -= 1;
        type = REMOVE_LIKES;
      } else {
        recipe.likedBy.push('6036818291a2143a8c40ba34');
        recipe.likes += 1;
        type = ADD_LIKES;
      }
      recipe
        .save()
        .then(() => {
          //will refactor this likingContainer
          return updateUser(type);
        })
        .then(() => {
          return Recipe.find();
        })
        .then((recipes) => {
          res.status(200).json({ recipes });
        });
    })
    .catch((err) => {
      console.log(err);
      next(errorCreator("Can't update the like value, please try again!"));
    });
};

const deleteRecipe = (req, res, next) => {
  User.findById('6036818291a2143a8c40ba34')
    .then((user) => {
      user.recipes = user.recipes.filter(
        (recipe) => recipe.toString() !== req.params.id.toString()
      );
      user.totalRecipes--;
      return user.save();
    })
    .then(() => {
      Recipe.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({ message: 'Successfully deleted the recipe!' });
      });
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
