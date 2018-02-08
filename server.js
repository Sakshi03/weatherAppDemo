const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var WeatherAPI = require('simple-weather-api');

var apikey = "08d604a68b0d8069d013ed80e16c4654";

const app = express()


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) { 
  let city = req.body.city;
   var weather = new WeatherAPI(apikey); 
   weather.getWeather(city).then(response => { 
       var weather = JSON.parse(response.body);
        res.render('index', {weather:"Temperature in "+ city + " is " +(parseInt(weather.main.temp) - 273.15).toFixed(2), error: null});
}, response =>{
        res.render('index', {weather:"Some error occured. Please Check city name is correct and try again", error: null});    
});
})

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!')
})