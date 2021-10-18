const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
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
        output.push(propertySelect(obj));
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
  id,
  name,
  html_url,
  description,
  owner: {
    id: owner['id'],
    login: owner['login'],
  },
  size,
  watchers_count,
  forks,
  private,
  created_at,
  updated_at,
});

module.exports.getReposByUsername = getReposByUsername;
