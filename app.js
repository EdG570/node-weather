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
    const lat = results.lat;
    const lng = results.lng;

    const weatherData = weather.fetchWeather(lat, lng, (errorMsg, results) => {
      if(errorMsg) {
        console.log(errorMsg);
      } else {
        const location = argv.a;
        const summary = results.data.currently.summary;
        const temp = Math.round(results.data.currently.temperature);
        const humidity = results.data.currently.humidity * 100;
        const pop = results.data.currently.precipProbability;

        console.log(results.data.currently);
        console.log(`Current weather conditions for ${location}:`);
        console.log(` Summary: ${summary}`);
        console.log(` Temp: ${temp} F`);
        console.log(` Humidity: ${humidity}%`);
        console.log(` Probability of precipitation: ${pop}%`);
      }
    });
  }
});
