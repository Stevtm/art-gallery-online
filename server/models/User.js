const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    art: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Art',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
	  getters: true
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
