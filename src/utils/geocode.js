const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXlhbm9rb2ppIiwiYSI6ImNsZ3NoeG5zODFpdzYzY210d2FhZjdweGoifQ.KBTYc7EvkLP2y-tdrvShyw'

    request({ url, json: true }, (error, { body } = {}) => { //geoURL was not working because url is the thing used in the request function
        if (error) {
            callback('can not connect to the geocode server', undefined)
        } else if (body.features.length === 0) {
            callback('can not find the place you are locking for', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode