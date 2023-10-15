const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../app');
const PORT = process.env.PORT || 3000; // backup port

// Error Handler
process.on('uncaughtException', err => {
  console.log(`UNCAUGHT EXCEPTION!\n`);
  console.log(`ERR: ${err.name}`);
  console.log(`MSG: ${err.message}\n`);
  console.log('SERVER NOW SHUTTING DOWN!');
  process.exit(1);
});

// Configs
dotenv.config({ path: './.env' });

// DB Connection
mongoose.set('debug', true);
const DB_CONNECT = process.env.DB_URL
  .replace('<password>', process.env.DB_PASS)
  .replace('<username>', process.env.DB_USER);

mongoose.connect(DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection successful!');
  });

// Server Start
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});

// Error Handler (post)
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION!\nSERVER SHUTTING DOWN...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
