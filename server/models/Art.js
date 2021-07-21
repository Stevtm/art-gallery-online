const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ArtSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  img: {
    data: Buffer,
    contentType: String
  },
  category: {
    type: String,
    required: ['photograph', 'drawing', 'painting'],
  },
  price: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
});

const Art = model('Art', ArtSchema);

module.exports = Art;
