const axios = require('axios');

const geocodeAddress = (address, callback) => {
  axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  })
    .then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        callback('Unable to find that address');
        return;
      } else if (response.data.status === 'OK') {
        callback(undefined, {
          address: response.data.results[0].formatted_address,
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng
        });
      }
    })
    .catch((error) => {
      callback('Unable to connect to Google Servers');
    });
};

module.exports = {
  geocodeAddress
};
