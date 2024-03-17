const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.addBookValidator = [
  check('coverImage').notEmpty().withMessage('Cover image URL is required'),
  check('pdf').notEmpty().withMessage('PDF URL is required'),
  check('category').notEmpty().withMessage('Category is required'),
  check('author').notEmpty().withMessage('Author name is required'),

  // You can add additional validation rules as needed

  validatorMiddleware,
];
