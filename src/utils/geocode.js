const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hyeXB0b2dyYWZpbyIsImEiOiJjanhjYWJiYzYwMTlrM3Fwa2NwMnN5Z3RuIn0.lTIj_8-WL9MvA-11asVVUQ&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to server', undefined)
        } else if(body.features.length == 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                place: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode