require('dotenv-safe').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const errorHandler = require('./utils/errorHandler');
const swaggerFile = require('../tools/swagger_output.json');
const dbconnection = require('./config/db');
const authRouter = require('./routes/authRouter');
const areaRouter = require('./routes/areaRouter');
const langRouter = require('./routes/langRouter');
const techRouter = require('./routes/techRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json()).use(cors());

dbconnection.connect();

app.use('/', authRouter);
app.use('/areas-of-interest/', areaRouter);
app.use('/programming-languages/', langRouter);
app.use('/technologies/', techRouter);
app.use('/user/', userRouter);
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = app;
