const request = require('request');

var getWeather = (lat, long, callback) => {

    const weatherKey = '5bfba865039206db519dfaaca8483ed4';
    const latitude = lat;
    const longitude = long;
    
    console.log(latitude);
    console.log(longitude);

    request({
        url :`https://api.darksky.net/forecast/${weatherKey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect darksky netr server');
        }
        else if(response.statusCode === 400){
            callback('400 The given location (or time) is invalid');
        }
        else if(response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
}

module.exports.getWeather = getWeather; 