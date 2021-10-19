const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database');

let app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.query;
  github.getReposByUsername(username)
    .then((response) => {
      res.status(201).send(response.data);
    });
  // res.status(201).send(`received request for: ${username}`);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = process.argv[2] || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

