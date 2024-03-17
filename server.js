const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const morgan = require("morgan");
const multer = require('multer'); // Make sure multer is imported


// Load environment variables from .env file
dotenv.config({ path: "config.env" });

const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

//Routes
const authRoute = require("./routes/authRoute");
const bookRoute = require('./routes/bookRoute'); 


//Connect with db
const { dbConnection, storage } = require('./config/db');


dbConnection();
// Use GridFS storage engine for multer
const upload = multer({ storage });


//express app
const app = express();
//middlewares
app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//Mount Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/books', bookRoute); 

//Handling Routes error if we hit invalid route
app.all("*", (req, res, next) => {
  next(new ApiError(`Cant find this route : ${req.originalUrl}`, 400));
});

//Global error handling middleware for express
app.use(globalError);

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Handling rejection outside express
//Events=>lis=>callback(err)
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors : ${err}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
