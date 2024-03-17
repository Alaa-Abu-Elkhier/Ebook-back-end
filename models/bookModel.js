const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    coverImage: {
      type: String,
      required: true,
    },
    pdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'uploads' // Reference to GridFS collection
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
