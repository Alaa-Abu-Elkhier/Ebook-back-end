const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');
const multer = require('multer');

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// @desc    Create Book
// @route   POST /api/v1/books
// @access  Public
exports.addBook = [
  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]),
  asyncHandler(async (req, res, next) => {
    console.log('alaa');
    // Extract the file paths from the request
    const coverImage = req.files['coverImage'][0].path;
    const pdf = req.files['pdf'][0].path;
    
    // Extract other data from the request body
    const { category, author } = req.body;
    console.log(req.body);

    try {
      // Create new book entry
      const book = await Book.create({
        coverImage,
        pdf,
        category,
        author,
      });
      res.status(201).json({
        success: true,
        data: book,
      });
    } catch (error) {
      console.error('Error adding book:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to add book.'
      });
    }
  })
];

// @desc    Get all books
// @route   GET /api/v1/books
// @access  Public
exports.getAllBooks = asyncHandler(async (req, res, next) => {
  // Fetch all books from the database
  const books = await Book.find();

  // Send response
  res.status(200).json({
    success: true,
    data: books,
  });
});
