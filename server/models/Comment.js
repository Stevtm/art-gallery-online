const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 240,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
