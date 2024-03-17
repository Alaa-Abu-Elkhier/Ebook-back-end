const express = require('express');
const router = express.Router();
const { storage } = require('../config/db');
const multer = require('multer');
const { addBookValidator } = require('../utils/validators/bookValidator');
const { addBook, getAllBooks } = require('../services/bookService');
const authService = require('../services/authService');

// Multer upload configuration
const upload = multer({ storage });

// Route to add a book
router.post('/add-book', authService.protect, upload.single('pdf'), addBookValidator, addBook);

// Route to get all books
router.get('/', getAllBooks);

module.exports = router;
