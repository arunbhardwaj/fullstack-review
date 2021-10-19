import $ from 'jquery';
import axios from 'axios';

export const sendUsernameToServer = (query, callback) => {
  return $.ajax({
    url: 'http://localhost:1128/repos',
    type: 'POST',
    data: JSON.stringify(query), // be sure to make query an obj and stringify it
    contentType: 'application/json',
    success: callback,
    error: function(error) {
      console.error(`Failed to send username to server <<<< ${query}`, error);
    }
  });
}

export const getTopRepos = () => {
  return axios.get('http://localhost:1128/repos')
}
