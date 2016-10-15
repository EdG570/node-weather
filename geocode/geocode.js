const axios = require('axios');

const geocodeAddress = (address) => {
  axios({
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  })
    .then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address');
        return;
      } else if (response.data.status === 'OK') {
        console.log(`Address: ${response.data.results[0].formatted_address}`);
        console.log(`Latitude: ${response.data.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${response.data.results[0].geometry.location.lng}`);
      }
    })
    .catch((error) => {
      console.log('Unable to connect to Google Servers');
    });
}

module.exports = {
  geocodeAddress
};
