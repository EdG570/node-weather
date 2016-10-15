const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
  .options({
   a: {
     demand: true,
     alias: 'address',
     describe: 'Address to fetch weather for',
     string: true
   }
  })
  .help()
  .alias('help', 'h')
  .argv;

const address = encodeURIComponent(argv.a);

axios({
  method: 'get',
  url: `https://ma.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
})
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      console.log('Unable to find that address');
      return;
    }
    console.log(`Address: ${response.data.results[0].formatted_address}`);
    console.log(`Latitude: ${response.data.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${response.data.results[0].geometry.location.lng}`);
  })
  .catch((error) => {
    console.log('Unable to connect to Google Servers');
  });
