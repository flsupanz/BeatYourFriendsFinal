
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));

app.use('/quiz', require('./quiz/quiz.controller'));
// Serve only the static files form the dist directory
app.use(express.static('./dist/'));

app.get('/*', function(req,res) {

  res.sendFile('index.html',{root: 'dist/'});
});

// start server
app.listen(process.env.PORT || 8080);
