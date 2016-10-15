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

const address = argv.a;

axios({
  method: 'get',
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
})
.then((response, body) => {
  console.log(`Address: ${response.data.results[0].formatted_address}`);
  console.log(`Latitude: ${response.data.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${response.data.results[0].geometry.location.lng}`);
})
.catch((error) => {
  console.error(error);
});
