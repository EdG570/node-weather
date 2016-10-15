const axios = require('axios');

const fetchWeather = (lat, lng, callback) => {
  const API_KEY = '46940efb7a90c0c5c6733a82a2796c29';

  axios({
    method: 'get',
    url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
    json: true
  })
    .then((response) => {
      if (response.status === 400) {
        callback('Unable to fetch weather.');
      } else if (response.status === 200) {
        callback(undefined, response);
      }
    })
    .catch((error) => {
      console.log('Error: ', error.message);
      callback('Unable to connect to weather servers');
    });
};

module.exports = {
  fetchWeather
};
