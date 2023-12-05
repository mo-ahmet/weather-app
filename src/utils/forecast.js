const request = require('request')


const forecast = (latitude, longitude, callback) => {
const url = `http://api.weatherstack.com/current?access_key=c7b115f70a9c9cc77a4860563df3c072&query=${latitude},${longitude}&units=f`

request ({url: url, json: true}, (error,{body}) => {
    if(error) {
        callback('Unable to connect to weather service')
    } else if (body.error) {
        callback('Unable to find location')
    } else {
        callback(undefined ,`${body.current.weather_descriptions[0]}. Right now it's ${body.current.temperature} degrees and if feels ${body.current.feelslike} degrees out`)

    }
} )}

module.exports = forecast
