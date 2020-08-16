const cors = require('cors');
const express = require('express');
const fs = require("fs")
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors())

require("./backend/Endpoints")(app)

app.get("/health", function(req, res){res.sendStatus(200)})
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.listen(PORT, () => {console.log('Running at ' + PORT )});