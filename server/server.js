var express   = require('express'),
    mongoose  = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/storeapp'); // connect to mongo database named shortly

app.get('/', function(req, res){
  // res.sendfile(__dirname + '/../client/app/index.html', {'root': '/../'});
  res.sendfile('index.html', {'root': '../client/app/'});
})

app.listen(3000);