const cors = require('cors');
const express = require('express');
const fs = require("fs")
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 8080;

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'docs')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cors())

require("./backend/Endpoints")(app)

app.listen(PORT, () => {console.log('Running at ' + PORT )});