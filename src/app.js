const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const absolutePathOfFile = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const absolutePartialPath = path.join(__dirname, '../templates/partials')
const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(absolutePathOfFile))
hbs.registerPartials(absolutePartialPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather is clever',
        name: 'Mohammad',
        age: 22
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page ready',
        name: 'Ahmad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        name: 'Ruslan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "please provide an address"
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        foreCast(latitude, longitude, (error, { temperature, humidity, feelslike } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                feelslike,
                humidity,
                temperature
            })
        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'Please provide a search key'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render(('404'), {
        title: '404',
        name: 'mohammad',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render(('404'), {
        title: '404',
        name: 'mohammad',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})









