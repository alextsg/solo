var express   = require('express'),
    mongoose  = require('mongoose'),
    path = require('path');

var app = express();


app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/../client/index.html'));
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});



//mongoose.connect('mongodb://localhost/storeapp'); // connect to mongo database named shortly
