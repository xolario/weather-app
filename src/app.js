const path = require('path') //core node module
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: '@alieno'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, place} = {}) => {
        if(error) {
            return res.send({error})
        } 
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                place,
                address: req.query.address,
                forecastData
            }) 
        })    
    
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            err: 'You must provide search '
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: '@alieno'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        message: 'don\'t be afraid, we\'ll help you',
        name: '@alieno'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "404 help page",
        title: 'Oops :(',
        name: '@alieno'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Ooops :(',
        errorMessage: 'This page doesn\'t exists.',
        name: '@alieno'
    })
})

// app.com
// app.com/about
// app.com/help

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})