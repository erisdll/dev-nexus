const mongoose = require('mongoose');

const DB_CONNECT = process.env.DB_URL
  .replace('<PASSWORD>', process.env.DB_PASS)
  .replace('<USERNAME>', process.env.DB_USER);

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
