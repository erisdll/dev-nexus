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
app.use(authRoutes);
// app.use(userRoutes);
// app.use(langRoutes);
// app.use(techRoutes);
// app.use(areaRoutes);

dbconnection.connect();

module.exports = app;