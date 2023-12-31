require('dotenv-safe').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const errorHandler = require('./controllers/errorController');
const swaggerFile = require('../tools/swagger_output.json');
const authRouter = require('./routes/authRouter');
const areaRouter = require('./routes/areaRouter');
const langRouter = require('./routes/langRouter');
const techRouter = require('./routes/techRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json()).use(cors());
app.use(express.static('public'));

app.use('/', authRouter);
app.use('/areas-of-interest', areaRouter);
app.use('/programming-languages', langRouter);
app.use('/technologies', techRouter);
app.use('/users', userRouter);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Handler
app.use(errorHandler);

module.exports = app;
