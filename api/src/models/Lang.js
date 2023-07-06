const mongoose = require('mongoose');

const langSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Lang = mongoose.model('Lang', langSchema);

module.exports = Lang;
