const path = require('path');
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const geocodeRequest = require('./utils/geocode');
const forecastRequest = require('./utils/forecast');

const app = express();
const port = process.env.PORT  || 3000

let publicDirectoryPath = path.join(__dirname, '../public');
let viewsPath = path.join(__dirname, '../templates/views');
let partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);    
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    let obj = {
        title: 'Weather...',
        name: 'Nate Hunter' 
    };
    res.render('index', obj);
});

app.get('/help', (req, res) => {
    let obj = {
        title: 'Help...',
        msg: 'Panda is here to help...'
    };
    res.render('help', obj);
});

app.get('/about', (req, res) => {
    let obj = {
        title: 'About...',
        name: 'Nate Hunter'
    };
    res.render('about', obj);
});

app.get('/help/*', (req, res) => {
    let obj = {
        title: '404',
        name: 'Nate Hunter',
        errorMsg: `Help article not found`
    };
    res.render('errorPage', obj); 
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    const date = new Date(Date.now()).toDateString();
    if (!address) return res.send({ error: "Please provide an address"});
    else { 
        geocodeRequest(address, (error, { lat, lon, location } = {}) => {
            if (error) return res.send({ error });
            forecastRequest(lat, lon, (error, forecastData) => {
                if (error) return res.send({ error });
                let data = {
                    ...forecastData,
                    location,
                    lat,
                    lon
                };
                res.send(data);
            });
        });
    }
});

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    let obj = {
        title: '404',
        name: 'Nate Hunter',
        errorMsg: `URL: '${req.url}' / HTTP method: ${req.method}`
    };
    res.render('errorPage', obj); 
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



