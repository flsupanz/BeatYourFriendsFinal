
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
app.use(express.static(__dirname + '/dist/WebTechProject2020'));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/WebTechProject2020/index.html'));
});

// start server
const port = 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
