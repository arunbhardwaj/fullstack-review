const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const repoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: String,
  repo_id: {
    type: Number,
    unique: true,
    required: true
  },
  description: String,
  owner: {
    id: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      lowercase: true,
      required: true
    }
  },
  watchers: Number,
  forks: Number,
  size: Number,
  private: Boolean,
  date: {
    created_at: String,
    updated_at: String,
  }
});

const Repo = mongoose.model('Repo', repoSchema);

// Make sure to format repoObject
const save = (repoObject = {}) => {
  Repo.findOneAndUpdate({repo_id: repoObject.repo_id}, repoObject, {upsert: true}, (err, repo) => {
    if (err) {
      console.error('There was an error adding a repo <<<<<', err)
    } else {
      console.log('Repo was added successfully >>>', repo);
    }
  })

  ////////////////////////////
  // Method 2: custom logic //
  ////////////////////////////
  // Unnecessary, findAndUpdate with upsert option does this for us
  // const newRepos = new Repo(repoObject);
  // Repo.findOne({repo_id: repoObject.repo_id}, (err, repo) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log('we are thinking of saving repo');
  //   if (repo == null) {
  //     newRepo.save();
  //   }
  // });
}

const getAll = (callback) => {
  /////////////////////////
  // Method 1: callbacks //
  /////////////////////////
  // filter, selectors for query projection, options object, callback
  //         '+' includes fields
  //         '-' excludes fields
  // Repo.find({}, '-_id -__v', {limit: 25, sort: {'size': -1}}, (err, results) => {
  //   (err) ? callback(err)
  //     : callback(null, results);
  // })

  ////////////////////////
  // Method 2: promises //
  ////////////////////////
  //ALL THE FIND AND QUERY FUNCTIONS RETURN A QUERY
  // ALL QUERY OBJECTS HAVE A .then() function and can
  // be used as a promise
  Repo.find({}, '-_id -__v', {limit: 25, sort: {'size': -1}})
    .then((results) => callback(null, results))
    .catch(err => callback(err))
}

module.exports.getAll = getAll;
module.exports.save = save;