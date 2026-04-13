import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Feedback content is required'],
    trim: true,
    minlength: [10, 'Feedback must be at least 10 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  image: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  isApproved: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create indexes
testimonialSchema.index({ createdAt: -1 });
testimonialSchema.index({ isApproved: 1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;