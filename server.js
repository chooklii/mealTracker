const cors = require('cors');
const express = require('express');
const fs = require("fs")
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 8080;

app.use(bodyParser.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cors())

require("./backend/Endpoints")(app)

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/allMeal', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/addMeal', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/recommend/main', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/recommend/cake', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/meal', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/deletedMeals', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));



app.listen(PORT, () => {console.log('Running at ' + PORT )});