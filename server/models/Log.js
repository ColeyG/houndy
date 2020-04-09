const mongoose = require('mongoose');

const logSchema = new mognoose.Schema({
  temp: {
    type: Number,
  },
  gas: {
    type: Number,
  },
  light: {
    type: Number,
  },
});

module.exports = mongoose.model('Log', logSchema);
