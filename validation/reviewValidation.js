import Joi from 'joi';

const reviewValidationSchema = Joi.object({
  content: Joi.string()
    .min(2)
    .max(500)
    .required()
    .messages({
      'string.base': 'Content must be a string',
      'string.empty': 'Content cannot be empty',
      'string.min': 'Content must have at least 2 characters',
      'string.max': 'Content must have less than 500 characters',
      'any.required': 'Content is required',
    }),
  
  rating: Joi.number()
    .min(0)
    .max(5)
    .required()
    .messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be between 0 and 5',
      'number.max': 'Rating must be between 0 and 5',
      'any.required': 'Rating is required',
    }),

  userID: Joi.string()
    .required()
    .messages({
    
      'any.required': 'UserID is required',
    }),

  productID: Joi.string()
    .required()
    .messages({
      'any.required': 'ProductID is required',
    }),
});

export default reviewValidationSchema;
