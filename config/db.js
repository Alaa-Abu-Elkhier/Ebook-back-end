const mongoose = require('mongoose');

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error(`Error connecting to database: ${err.message}`);
    });
};

module.exports = { dbConnection };
