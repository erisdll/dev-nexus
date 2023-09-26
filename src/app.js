require('dotenv-safe').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const swaggerUi = require('swagger-ui-express');


const AppError = require('./utils/appError');
const GobalerrorHandler = require('./controllers/errorController');
const swaggerFile = require('../tools/swagger_output.json');
const database = require('./config/database');
const authRouter = require('./routes/authRouter');
const areaRouter = require('./routes/areaRouter');
const langRouter = require('./routes/langRouter');
const techRouter = require('./routes/techRouter');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json()).use(cors());
app.use(express.static('public'));

database.connect();

app.use('/', authRouter);
app.use('/areas-of-interest', areaRouter);
app.use('/programming-languages', langRouter);
app.use('/technologies', techRouter);
app.use('/users', userRouter);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(GobalerrorHandler);

module.exports = app;
