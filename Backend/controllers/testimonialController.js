import Testimonial from '../models/Testimonial.js';
import { validationResult } from 'express-validator';

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ createdAt: -1 });
    
    console.log(`Found ${testimonials.length} testimonials`); // Add this log
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials'
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
    
    // Generate avatar image
    const image = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff&bold=true&length=2`;
    
    const testimonial = await Testimonial.create({
      name,
      email,
      role,
      content,
      rating,
      image,
      date: new Date()
    });
    
    console.log('Created new testimonial:', testimonial._id); // Add this log
    
    const testimonialResponse = testimonial.toObject();
    delete testimonialResponse.email;
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      data: testimonialResponse
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit testimonial'
    });
  }
};