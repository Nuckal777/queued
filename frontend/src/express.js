const express = require('express');
const app = express();
const fs = require('fs');
let rawdata = fs.readFileSync('staticMocks/storelist.json');
let capacitydata = fs.readFileSync('staticMocks/capacity.json');
let bookingsdata = fs.readFileSync('staticMocks/bookings.json')
let bookingdata = fs.readFileSync('staticMocks/booking.json');


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/storelist', (req, res) => res.send(JSON.parse(rawdata)))
app.get('/api/capacity', (req, res) => res.send(JSON.parse(capacitydata)))
app.get('/api/bookings', (req, res) => res.send(JSON.parse(bookingsdata)))

app.post('/api/booking', function(req, res) {
    res.send(JSON.parse(bookingdata));
});

app.listen(8080);
