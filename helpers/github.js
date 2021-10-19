const axios = require('axios');
const config = require('../config.js');
const db = require('../database/');

let getReposByUsername = (username) => {
  let options = {
    method: 'GET',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      Authorization: `token ${config.TOKEN}`,
    },
    transformResponse: (data) => {
      data = JSON.parse(data);
      let output = [];
      for (let obj of data) {
        let newObj = propertySelect(obj);
        db.save(newObj);
        output.push(newObj);
      }
      return output;
    },
  };
  return axios(options);
};

let propertySelect = ({
  id,
  name,
  html_url,
  description = '',
  owner,
  size,
  watchers_count,
  forks,
  private,
  created_at,
  updated_at,
}) => ({
  repo_id: id,
  name,
  url: html_url,
  description,
  owner: {
    id: owner['id'],
    username: owner['login'],
  },
  size,
  watchers_count,
  forks,
  private,
  date: {
    created_at,
    updated_at,
  }
});

module.exports.getReposByUsername = getReposByUsername;