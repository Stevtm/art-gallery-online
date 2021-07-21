const mongooose = require('mongoose');

mongooose.Mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/art-gallery-online',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
