const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cookTime: {
    hours: {
      type: Number,
    },
    minutes: {
      type: Number,
      required: true,
    },
  },
  desc: {
    type: String,
    required: true,
  },
  ingredients: {
    ingArray: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: String,
          required: true,
        },
      },
    ],
  },
  procedure: {
    type: String,
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
