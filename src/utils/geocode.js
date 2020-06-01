const request = require("postman-request");

const API_KEY = "pk.eyJ1Ijoiam9zYTMxMCIsImEiOiJja2FvZWV4MHMwY3NzMnVxbjUzNm1obWd0In0.tSCt-cmbGOm9F1IVZ18tJw";
const ENDPOINT = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const geocode = (address, callback) => {

    const query = `${encodeURIComponent(address)}.json?access_token=${API_KEY}&limit=1`;
    const url = `${ENDPOINT}${query}`;

    request({url: url, json: true}, (error, {body}) => {
        if (error)
        {
            callback("Service unavailable!", undefined);
        }
        else if (body.features.length === 0)
        {
            callback("Unable to find location!", undefined);
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;