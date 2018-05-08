const request = require('request');

geocodeAddress =(address) =>{
    return new Promise( (resolve, reject) => {
        var encodeAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
        json: true 
    }, (error, response, body) => {
        if(error){
            reject('Unable to connect Google maps server');
        }
        else if(body.status === 'ZERO_RESULTS'){
           reject('Unable to find that address.');   
        }
        else if(body.status === 'OK'){
            resolve({
               address: body.results[0].formatted_address,
               latitude: body.results[0].geometry.location.lat,
               longitude:  body.results[0].geometry.location.lng
            });
        }
    });
    });
}


geocodeAddress(0000).then( (res) => {
    console.log(JSON.stringify(res, undefined, 4));
}, (error) => {
    console.log(error);
});