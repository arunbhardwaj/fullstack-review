const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
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
let save = (repoObject = {}) => {
  let newRepos = new Repo(repoObject);
  newRepos.bulkSave();
  // Unnecessary, bulkSave() does this for us
  // Repo.findOne({repo_id: repoObject.repo_id}, (err, repo) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   if (repo == null) {
  //     newRepo.save();
  //   }
  // });
}

// let getAll = () => {
//   let results = Repo.find({})._addSpecial('$orderby', {'size': -1})
//   console.log(results);
// }

// repoSchema.query.byId = function(id) {
//   return this.where({repo_id: id});
// }

module.exports.save = save;