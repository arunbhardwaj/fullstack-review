const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database');

let app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = req.body.username;
  github.getReposByUsername(username)
    .then((response) => { // response.data is what we are looking
      res.status(201);
    })
    // So we have reponse.data but I'm doing this so I can
    // have the get request handle only sending 25 results.
    // otherwise we need a function to interpolate the new results
    // into the old top 25
    .then(() => db.getAll((err, results) => {
      res.send(results);
    }))
    .catch(err => {
      res.status(500).send();
    });
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