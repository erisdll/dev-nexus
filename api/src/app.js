require('dotenv-safe').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dbconnection = require('./database/mongoConnection');

const app = express();

app.use(express.json())

app.use(authRoutes)
app.use(userRoutes);
app.use(langRoutes);
app.use(techRoutes);
app.use(areaRoutes);

dbconnection.connect();

module.exports = app;