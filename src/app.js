const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partialPath)

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'Andrew'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page', 
        name: 'Andrew'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
       text: 'some help text',
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send ({error: 'No address submitted'})
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        
        forecast(longitude, latitude, (error, forecast) =>{
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast,
                location
            })
        })
    })
})
   


app.get('/help/*', (req,res) => {
    res.render('404', {
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        errorMessage: 'Page not found. 404'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

