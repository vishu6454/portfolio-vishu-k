import { validationResult } from 'express-validator';
import { sendContactEmail as sendEmail } from '../services/emailService.js';

export const sendContactEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        message: 'Validation failed'
      });
    }
    
    const { user_name, user_email, subject, message } = req.body;
    
    const result = await sendEmail({
      user_name,
      user_email,
      subject: subject || '',
      message
    });
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully! I will get back to you soon.'
      });
    } else {
      throw new Error('Email delivery failed');
    }
    
  } catch (error) {
    console.error('Error in contact controller:', error);
    
    let errorMessage = 'Failed to send message. ';
    if (error.message.includes('Invalid login')) {
      errorMessage += 'Email configuration error. Please contact the administrator.';
    } else if (error.message.includes('connect')) {
      errorMessage += 'Network error. Please try again later.';
    } else {
      errorMessage += error.message;
    }
    
    return res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};