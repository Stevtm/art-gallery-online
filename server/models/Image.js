const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  name: String,
  description: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = model('Image', imageSchema);

module.exports = Image;
