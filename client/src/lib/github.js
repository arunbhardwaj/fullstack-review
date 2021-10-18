import $ from 'jquery';

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

  // return $.ajax({
  //   url: this.url,
  //   type: 'POST',
  //   dataType: 'json', // specifies type of data you want to receive
  //   data: {todoText: text},
  //   success: callback
  // });
}