const { Schema } = require('mongoose');

const likeSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
  },
});

likeSchema.virtual('likeCount').get(function () {
  return this.like.length;
});

const Like = model('Like', likeSchema);

module.exports = Like;
