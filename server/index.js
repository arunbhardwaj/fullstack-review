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
  console.log(req.body);
  let username = req.body.query;
  github.getReposByUsername(username)
    .then((response) => {
      res.status(201).send(response.data);
    });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('hit get endpoint');
  // let results = db.Repo.find({})._addSpecial('$orderby', {'size': -1})
  // console.log(results);
});

let port = process.argv[2] || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

