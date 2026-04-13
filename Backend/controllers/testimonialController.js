import Testimonial from '../models/Testimonial.js';
import { validationResult } from 'express-validator';

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    console.log('Fetching testimonials from database...');
    
    // Check database connection
    if (Testimonial.db.readyState !== 1) {
      console.error('Database not connected');
      return res.status(503).json({
        success: false,
        message: 'Database connection is not ready'
      });
    }
    
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .lean(); // Use lean() for better performance
    
    console.log(`Found ${testimonials.length} testimonials`);
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    console.error('Error details:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create new testimonial
export const createTestimonial = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: 'Validation failed'
      });
    }

    const { name, email, role, content, rating } = req.body;
    
    // Check database connection
    if (Testimonial.db.readyState !== 1) {
      console.error('Database not connected');
      return res.status(503).json({
        success: false,
        message: 'Database connection is not ready'
      });
    }
    
    // Generate avatar image
    const image = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff&bold=true&length=2`;
    
    const testimonial = await Testimonial.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role.trim(),
      content: content.trim(),
      rating,
      image,
      date: new Date()
    });
    
    console.log('Created new testimonial:', testimonial._id);
    
    const testimonialResponse = testimonial.toObject();
    delete testimonialResponse.email;
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      data: testimonialResponse
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    console.error('Error details:', error.message);
    
    // Handle duplicate key errors or validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to submit testimonial',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};