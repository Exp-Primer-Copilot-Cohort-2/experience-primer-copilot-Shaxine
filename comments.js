// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var _ = require('lodash');

var comments = require('./comments.json');

app.use(cors());
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', function(req, res) {
  var newComment = req.body;
  newComment.id = _.uniqueId('comment_');
  comments.unshift(newComment);
  fs.writeFile('comments.json', JSON.stringify(comments, null, 2), function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Server error');
    } else {
      res.json(newComment);
    }
  });
});

app.listen(3001, function() {
  console.log('Server running on http://localhost:3001');
});