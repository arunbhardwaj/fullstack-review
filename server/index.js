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
  let username = req.body.username;
  github.getReposByUsername(username)
    .then((response) => {
      res.status(201);
    })
    .then(() => db.getAll((err, results) => {
      res.send(results);
    }))
});

app.get('/repos', function (req, res) {
  console.log('hit get endpoint');
  db.getAll((err, results) => {
    console.log(results);
    res.status(200).send(results);
  });
});

let port = process.argv[2] || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

