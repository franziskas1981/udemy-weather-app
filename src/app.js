const path = require('path')
const express = require('express')  // express is a function; calls a new express application
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()               // initiates new express application
const port = process.env.PORT || 3000     // port uses the default port on heroku OR port 3000 if the environment variable is not available locally

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')  // set up alternate path for the handlebars templates
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location 
app.set('view engine', 'hbs')            // set up a Handlebars View Engine for express  
app.set('views', viewsPath)              // point express to custom directory
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDir))       

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'Franzi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About', 
        name: 'Franzi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'Provide a location (city name) in the form and click send!', 
        name: 'Franzi'
    })
})

// configures what server should do if someone goes to a specific URL; e.g. 'about' for url.com/about; static pages!
// req = request; res = response from the server

app.get('/weather', (req, res) => {
    const LocArg = req.query.address

    if (!req.query.address) {
        return res.send ({
            error: 'You must provide an address'
        })    
    }
    
    geocode (LocArg, (error, {lat, lon, loc}= {}) =>   {
        if (error) {
            return res.send({
                error: error
            })
        }        
        weather(lat, lon, (error, weatherdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }        
            res.send({
                address: LocArg,
                location: loc,
                weather: weatherdata
            })            
        })
    })
}) 

//set up 404 page. Has to come AFTER all other routes! 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error', 
        message: 'Help article not found', 
        name: 'Franzi'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error', 
        message: 'Page not found', 
        name: 'Franzi'
    })
})

//starts up the server; listening on port 3000 (common dev port; port 80 is the default http port). Second argument is callback! 
app.listen(port, () => {
    console.log('Server started on port' + port)
})