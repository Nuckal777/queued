const express = require('express');
const app = express();
const fs = require('fs');
let rawdata = fs.readFileSync('staticMocks/storelist.json');

app.get('/storelist', (req, res) => res.send(JSON.parse(rawdata)))

app.listen(8080)
