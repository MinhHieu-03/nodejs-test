const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  username: String,
  password: String, // Hash ở controller
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
});

module.exports = mongoose.model('User', userSchema);
