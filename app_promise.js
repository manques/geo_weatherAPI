const yargs = require('yargs');
const axios = require('axios');

const argv =yargs.options({
     a:{
         demand: true,
         alias: 'address',
         describe: 'Address to fetch weather for',
         string: true
     }
})
.help()
.alias('help', 'h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find new Address.');
    }
    var weatherKey = '5bfba865039206db519dfaaca8483ed4';
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    weatherUrl = `https://api.darksky.net/forecast/${weatherKey}/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then( (response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`it's currently ${temperature}. it's feel ${apparentTemperature}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect ot server.');
    }
    else{
        console.log(e.message);
    }
});