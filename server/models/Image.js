const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  imgName: {
    type: String,
    required: true,
  },
  imgData: {
    type: String,
    required: true,
  },
});

const Image = model('Image', imageSchema);

module.exports = Image;
