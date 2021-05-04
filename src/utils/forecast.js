const request = require('postman-request');
const forcast = require('postman-request');


const WEATHER_API_KEY = `4ec051028077467807b555494c8bfb32`

const forecastRequest = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${lat},${lon}&units=f`

    request({ url, json: true }, (error, response, body) => {

        const { weather_descriptions, temperature, feelslike, humidity } = body.current;

        if (error) {
            let msg = 'Unable to connect to weather service';
            callback(msg, undefined)
        } else if (body.error) {
            let msg = `[${body.error.code}]  ${body.error.info}`
            callback(msg, undefined);
        } else {
            // const weatherMsg = `[${weather_descriptions[0]}]  It is currently ${temperature}-F out there (feels like ${feelslike}-F). The humidity level is ${humidity}%.`

            const forecastData = {
                forecast: weather_descriptions,
                temperature,
                feelslike,
                humidity,
                localtime: body.location.localtime
            }

            callback(undefined, forecastData)
        }
    })
}

module.exports = forecastRequest;
