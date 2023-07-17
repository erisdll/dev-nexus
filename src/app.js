require('dotenv-safe').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dbconnection = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const langRoutes = require('./routes/langRoutes');
const areaRoutes = require('./routes/areaRoutes');
const techRoutes = require('./routes/techRoutes');

const app = express();

app.use(express.json());
dbconnection.connect();

app.use(authRoutes);
// app.use(userRoutes);
// app.use(langRoutes);
// app.use(techRoutes);
// app.use(areaRoutes);

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger/swagger_output.json')

app.use('./documentation-route', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = app;