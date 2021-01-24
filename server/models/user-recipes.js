const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  totalRecipes: {
    type: Number,
    required: true,
  },
  loves: {
    type: Number,
    required: true,
  },
  socialMedia: [
    {
      name: {
        type: String,
      },
      link: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
