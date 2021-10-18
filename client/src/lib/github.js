
export const searchGithub = (text, callback) => {

  $.ajax({
    url: 'https://app-hrsei-api.herokuapp.com/api/recastly/videos',
    type: 'GET',
    data: {
      key: API_KEY,
      q: query,
    },
    contentType: 'application/json',
    success: callback,
    error: function(error) {
      console.error('hackreactor_youtube_api: Failed to fetch videos', error);
    }
  });
}