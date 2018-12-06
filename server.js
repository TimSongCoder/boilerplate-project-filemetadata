'use strict';

var express = require('express');
var cors = require('cors');
const fs = require('fs');

// require and use "multer"...
const multer = require('multer');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', multer({dest: process.cwd() + '/uploads/'}).single('upfile'), (req, res) => {
  res.json({filename: req.file.originalname, file_size: req.file.size});
  console.log(req.file);
  // Delete the uploaded file after response sending
  fs.unlink(req.file.path, err => {
    if(err){
      throw err;
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
