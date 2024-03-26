// Create web server


// Define dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Start server
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});

// Define routes
app.use(bodyParser.json());
app.use(express.static('public'));

// Get comments from database
app.get('/comments', function(req, res) {
  MongoClient.connect('mongodb://localhost:27017/comments', function(err, db) {
    assert.equal(null, err);
    db.collection('comments').find().toArray(function(err, comments) {
      assert.equal(null, err);
      res.send(comments);
    });
  });
});

// Post comments to database
app.post('/comments', function(req, res) {
  MongoClient.connect('mongodb://localhost:27017/comments', function(err, db) {
    assert.equal(null, err);
    db.collection('comments').insertOne(req.body, function(err, result) {
      assert.equal(null, err);
      res.send(result);
    });
  });
});

// Serve static files
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/public/style.css');
});

// Serve index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Serve comments.js
app.get('/comments.js', function(req, res) {
  res.sendFile(__dirname + '/public/comments.js');
});

// Serve 404.html
app.get('*', function(req, res) {
  res.status(404).sendFile(__dirname + '/public/404.html');
});

// Serve 500.html
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).sendFile(__dirname + '/public/500.html');
});

// Serve 400.html
app.use(function(req, res) {
  res.status(400).sendFile(__dirname + '/public/400.html');
});