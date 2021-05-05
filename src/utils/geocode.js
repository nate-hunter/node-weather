const request = require('postman-request');

const MAPBOX_TOKEN = `pk.eyJ1IjoiZ2VvLW5qaCIsImEiOiJja2tlbm0wMG4wYTZxMnRvOWgzMW40MnZrIn0.THEKmBrpYOVAQ-15u4bEMA`

const geocodeRequest = (location, callback) => {
    const uriLocation = encodeURIComponent(location);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${uriLocation}.json?access_token=${MAPBOX_TOKEN}&limit=1`

    request({ url, json: true}, (error, response, body) => {
        if (error) {
            const msg = 'Unable to connect to geocoding service.';
            callback(msg, undefined);
        } else if (body.message || body.features.length === 0) {
            let msg = ''
            body.message 
                ? msg = `Unable to find location | Error Msg: '${body.message}'`
                : msg = `Unable to find location | Double check query: '${body.query}'`;
            callback(msg, undefined);
        } else {
            let lat = body.features[0].center[1] || 0;
            let lon = body.features[0].center[0] || 0;
            let location = body.features[0]['place_name'];

            callback(undefined, { lat, lon, location })
        }
    })
}

module.exports = geocodeRequest;