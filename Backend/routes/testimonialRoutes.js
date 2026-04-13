import express from 'express';
import { body } from 'express-validator';
import { getTestimonials, createTestimonial } from '../controllers/testimonialController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const testimonialLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Too many submissions. Please try again in an hour.'
  }
});

const testimonialValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('content').trim().isLength({ min: 10 }).withMessage('Feedback must be at least 10 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5')
];

router.get('/', getTestimonials);
router.post('/', testimonialLimiter, testimonialValidation, createTestimonial);

export default router;