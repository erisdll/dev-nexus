const mongoose = require('mongoose');
mongoose.set('debug', true);
const DB_CONNECT = process.env.DB_URL
  .replace('<password>', process.env.DB_PASS)
  .replace('<username>', process.env.DB_USER);

exports.connect = async () => {
  try {
    await mongoose.connect(DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected!');
  } catch (err) {
    console.error(`Database connection failed:\n${err}`);
  }
};
