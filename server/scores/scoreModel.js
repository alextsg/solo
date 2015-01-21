var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
  score: Number,
  name: String
});

module.exports = mongoose.model('Score', ScoreSchema);