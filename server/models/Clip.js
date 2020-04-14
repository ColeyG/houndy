const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema({
  time: {
    type: Number,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Clip', clipSchema);
