const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
    console.log(JSON.stringify(results, undefined, 2));
    const weatherData = weather.fetchWeather(results.lat, results.lng, (errorMsg, results) => {
      if(errorMsg) {
        console.log(errorMsg);
      } else {
        console.log(results.data.currently.summary);
      }
    });
  }
});
