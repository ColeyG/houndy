const mongoose = require('mongoose');

const clipSchema = new mognoose.Schema({
  time: {
    type: Number,
  },
  name: {
    type: Number,
  },
});

module.exports = mongoose.model('Clip', clipSchema);
