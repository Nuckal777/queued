const express = require('express');
const app = express();
const fs = require('fs');
let rawdata = fs.readFileSync('staticMocks/storelist.json');
let capacitydata = fs.readFileSync('staticMocks/capacity.json');

app.get('/storelist', (req, res) => res.send(JSON.parse(rawdata)))
app.get('/capacity', (req, res) => res.send(JSON.parse(capacitydata)))

app.listen(8080)
