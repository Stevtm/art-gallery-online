const { Schema } = require('mongoose');

const likeSchema = new Schema(
  {
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

likeSchema.virtual('likeCount').get(function () {
  return this.like.length;
});

module.exports = likeSchema;
