const request = require("postman-request");

const API_KEY = "4ad666a067fcdb4ebffd495d676c8f2a";
const ENDPOINT = "http://api.weatherstack.com/current";

const forecast = (latitude, longitude, callback) => {

    const query = `?access_key=${API_KEY}&query=${latitude},${longitude}&units=m`;
    const url = `${ENDPOINT}${query}`;

    request({url, json: true}, (error, {body}) => {
        if (error)
        {
            callback("Service unavailable!", undefined);
        }
        else if (body.error)
        {
            callback("Unable to find location!", undefined);
        }
        else
        {
            const { weather_descriptions:descriptions, temperature, feelslike, humidity } = body.current;
            const message = `${descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. Humidity: ${humidity}`;
            callback(undefined, message);
        }
    });
};

module.exports = forecast;