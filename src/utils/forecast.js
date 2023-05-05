const request = require('request')

const foreCast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8436eaada2f27e720f098a7268bb327e&query=' + latitude + ',' + longitude + '&units=f'

    //http://api.weatherstack.com/current?access_key=8436eaada2f27e720f098a7268bb327e&query=37.8267,-122.4233&units=f

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the weatherstack server!', undefined)
        } else if (body.error) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = foreCast