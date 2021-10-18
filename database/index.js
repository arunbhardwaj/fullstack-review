const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  repo_id: Number,
  description: String,
  owner: String,
  owner_id: Number,
  watchers: Number,
  forks: Number,
  size: Number,
  private: Boolean,
  date: {
    created_at: String,
    updated_at: String,
  }
});

let Repo = mongoose.model('Repo', repoSchema);

// Make sure to format repoObject
let save = (repoObject = {}) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let newRepo = new Repo(repoObject);
  // await
          newRepo.save();
}

module.exports.save = save;