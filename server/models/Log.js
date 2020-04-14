const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  logType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  time: {
    type: Number,
  },
});

module.exports = mongoose.model('Log', logSchema);
