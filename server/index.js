const express = require('express');
const {getReposByUsername} = require('../helpers/github.js');
const db = require('../database');

let app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function ({body: {username}}, res) {
  getReposByUsername(username)
    .then(response => res.status(201))
    // So we have reponse.data but I'm doing this so I can
    // have the get-request handler handle sending only 25 results.
    // otherwise we need a function to interpolate the new results
    // into the old top 25
    .then(() => db.getTop25())
    .then(results => res.send(results))
    .catch(err => res.sendStatus(500));
});

app.get('/repos', function (req, res) {
  /////////////////////////
  // Method 1: Callbacks //
  /////////////////////////

  // db.getTop25((err, results) => {
  //   res.status(200).send(results);
  // });

  ////////////////////////
  // Method 2: Promises //
  ////////////////////////

  db.getTop25()
    .then(results => res.status(200).send(results));
});

let port = process.argv[2] || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});