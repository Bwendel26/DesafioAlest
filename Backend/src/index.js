'use strict';

const express = require('express');
// const app = express();
const cors = require('cors');
const config = require('./config');
const productRoutes = require('./routes/student-routes');

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use('./api', productRoutes.routes);

app.listen(config.port, () => console.log('App is listening on port ' + config.port));