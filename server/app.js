var express = require('express');
var path = require('path');

var app = express();

module.exports = app;

app.use(express.static(path.join(__dirname, '../node_modules')));
app.use('/browser', express.static(path.join(__dirname, '../browser')));

app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, '../browser/index.html'));
});

app.use('/api/graphs', require('./routes/graphs'));
