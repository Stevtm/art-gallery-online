const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const likeSchema = require('./Like');

const artSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    img: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    category: {
      type: String,
      required: ['photograph', 'drawing', 'painting'],
    },
    price: {
      type: Number,
      required: true,
    },
    tag: [
      {
        type: String,
      },
    ],
    likes: [likeSchema],
    comments: [commentSchema],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Art = model('Art', artSchema);

module.exports = Art;
