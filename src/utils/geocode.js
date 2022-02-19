const request = require ('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieGFuYXRvc2RjIiwiYSI6ImNrenB2dWo4dTAyOGMydm85aHoybXhoMXgifQ.biY0ZJYnIe1ngdABliKJkg&limit=1'

    request ({ url, json:true}, (error, {body}) => {
        if (error) {
             callback ('Unable to connect to location services!')       //value for data will be "undefined", if not provided
        } else if (body.features.length === 0) {
             callback ('Unable to find location') 
        } else {
             callback (undefined, {
                 lat: body.features[0].center[1],
                 lon: body.features[0].center[0],
                 loc: body.features[0].place_name
             })
        }
    })
}

module.exports = geocode