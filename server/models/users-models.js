const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
  location: {
    type: String,
    minlength: true,
  },
  socialMedia: [
    {
      type: String,
      minlength: 1,
    },
  ],
  recipes: [
    {
      type: String,
    },
  ],
  totalLikes: {
    type: Number,
  },
  totalRecipes: {
    type: Number,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
