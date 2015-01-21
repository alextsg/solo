var express   = require('express'),
    mongoose  = require('mongoose'),
    path = require('path'),
    parser = require('body-parser'),
    Score = require('./scores/scoreModel');

mongoose.connect('mongodb://tester:tester123@ds031271.mongolab.com:31271/heroku_app33359693');

var db = mongoose.connection;

db.once('open', function(callback){
  console.log('connected to db');
})

var app = express();

app.use(parser());


app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.get('/api/scores', function(req, res){
  // do a db call and return scores here
  console.log('get request');
  Score.find(function(err, scores){
      if (err) console.log(err);
      else {
        console.log(scores);
        res.status(201).json(scores);
      }
    })
});

app.post('/api/scores/create', function(req, res){
  // store the req.body in the database
  var scores = req.body;
  console.log(scores);
  if(scores){
    var scores = new Score(scores);
    scores.save(function(err, results){
      if(err){
        res.status(500).end();
      } else {
        res.status(201).json(results);
      }
    })
  }
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});



module.exports = app;