require('dotenv-safe').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json())

module.exports = app;