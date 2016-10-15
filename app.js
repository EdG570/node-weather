const yargs = require('yargs');

const geocode = require('./geocode/geocode');

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

const geocodeAddress = geocode.geocodeAddress(address, (errorMsg, results) => {
  if(errorMsg) {
    console.log(errorMsg);
  } else {
    console.log(`Address: ${results.address}`);
    console.log(`Latitude: ${results.lat}`);
    console.log(`Longitude: ${results.lng}`);
  }
});
