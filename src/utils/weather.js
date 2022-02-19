const request = require ('postman-request')

const weather = (lat, lon, callback) => {
     const url ='http://api.weatherstack.com/current?access_key=f8583ceb268a68b5ad120d59aedb3274&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon)
     request ({ url, json:true}, (error, {body} = {}) => {
         if (error) {
             callback ('Unable to connect to weather service')
         } else if (body.error) {
             callback (body.error.info)
         } else {
             callback (undefined, 'It is currently '+ body.current.temperature + ' degrees out. And it feels like ' + body.current.feelslike + ' degrees!')
         }
     })
}
module.exports = weather
