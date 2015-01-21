var Score = require('./scoreModel.js');
var Q = require('q');

module.exports = {
  addScore: function(req, res, next) {
    /*
    var createScore = Q.nbind(Score.create, Score);
    var newScore = {
      name: req.name,
      score: req.score
    };
    return createScore(newScore).then(function (createdScore) {
      if (createdScore) {
        res.json(createdScore);
      }
    }).fail(function (error) {
      next(error);
    });
*/
    var score = new Score({ name: req.name, score: req.score});
    score.save(function(err, res){
      if (err) console.log(err);
      else {
        console.log(res);
      }
    })
  },

  getScores: function(req, res, next) {
    /*
    var getAll = Q.nbind(Score.find, Score);
    getAll({})
    .then(function(scores){
      res.json(scores);
    })
    .fail(function(error){
      next(error);
    });
*/
    Score.find(function(err, scores){
      if (err) console.log(err);
      else {
        console.log(scores);
      }
    })
  }

};