import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft,
  FaPlus, FaTimes, FaUser, FaEnvelope, FaComment
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-hot-toast";
import axiosInstance from "../config/axios";

const API_URL = import.meta.env.VITE_API_URL || "https://portfolio-vishu-k.onrender.com/api";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    content: '',
    rating: 5
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch testimonials from backend
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching testimonials from:", `${API_URL}/testimonials`);
      
      const response = await axiosInstance.get('/testimonials');
      
      console.log("API Response:", response.data);
      
      if (response.data.success) {
        setTestimonials(response.data.data);
        console.log("Testimonials loaded:", response.data.data.length);
        if (response.data.data.length > 0) {
          setCurrentIndex(0);
        }
      } else {
        setError(response.data.message || "Failed to load testimonials");
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      
      if (error.code === 'ERR_NETWORK') {
        setError("CORS error: Cannot connect to backend. Please check server configuration.");
      } else if (error.code === 'ECONNABORTED') {
        setError("Request timeout. Please check your internet connection.");
      } else if (error.response) {
        setError(error.response.data.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        setError("Cannot connect to server. Please check if backend is running.");
      } else {
        setError(error.message || "An error occurred while loading testimonials");
      }
      
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  // Check API health
  const checkApiHealth = async () => {
    try {
      const healthUrl = `${API_URL.replace('/api', '')}/api/health`;
      console.log("Checking API health at:", healthUrl);
      const response = await axiosInstance.get('/health');
      console.log("API Health:", response.data);
      if (!response.data.mongodbConnected) {
        console.warn("Database is not connected");
        setError("Database is connecting. Please refresh in a moment.");
      }
    } catch (error) {
      console.error("Health check failed:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    checkApiHealth();
  }, []);

  const next = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prev = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      content: '',
      rating: 5
    });
    setFormErrors({});
    document.body.style.overflow = "auto";
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.role.trim()) {
      errors.role = "Role/Position is required";
    }

    if (!formData.content.trim()) {
      errors.content = "Feedback is required";
    } else if (formData.content.trim().length < 10) {
      errors.content = "Please provide more details (min 10 characters)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting testimonial:", formData);
      const response = await axiosInstance.post('/testimonials', formData);
      console.log("Submit response:", response.data);
      
      if (response.data.success) {
        await fetchTestimonials();
        closeModal();
        toast.success("Thank you for your feedback!");
      } else {
        throw new Error(response.data.message || "Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Failed to submit");
      } else if (error.request) {
        toast.error("Cannot connect to server. Please try again later.");
      } else {
        toast.error(error.message || "Failed to submit");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="testimonials" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
        <div className="max-w-5xl mx-auto text-center">
          <div className={`rounded-lg p-6 ${isDark ? "bg-red-900/20" : "bg-red-50"}`}>
            <p className={`text-lg mb-4 ${isDark ? "text-red-400" : "text-red-600"}`}>
              Error loading testimonials: {error}
            </p>
            <button 
              onClick={fetchTestimonials}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="testimonials" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${isDark
        ? "bg-linear-to-br from-slate-900 via-purple-900 to-emerald-900"
        : "bg-linear-to-br from-slate-50 via-purple-50 to-emerald-50"
        }`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-emerald-500 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-800"
              }`}>
              Client <span className="text-transparent bg-linear-to-r from-purple-600 to-emerald-600 bg-clip-text">Testimonials</span>
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl mx-auto ${isDark ? "text-slate-300" : "text-slate-600"
              }`}>
              What people say about working with me
            </p>
          </motion.div>

          {/* Testimonials Display Section */}
          {testimonials.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className={`rounded-2xl p-6 sm:p-8 backdrop-blur-xl ${isDark ? "bg-slate-800/50 border border-slate-700/50" : "bg-white/60 border border-slate-200"
                  }`}>
                  <FaQuoteLeft className={`text-3xl mb-4 ${isDark ? "text-purple-400" : "text-purple-500"}`} />

                  <p className={`text-base sm:text-lg leading-relaxed mb-6 ${isDark ? "text-slate-200" : "text-slate-700"
                    }`}>
                    {testimonials[currentIndex].content}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className={`font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                  </div>

                  <p className={`text-xs mt-3 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                    {new Date(testimonials[currentIndex].date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {testimonials.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${isDark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-white text-slate-800 hover:bg-slate-50"
                        }`}
                    >
                      <FaChevronLeft className="text-xs sm:text-sm" />
                    </button>

                    <button
                      onClick={next}
                      className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${isDark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-white text-slate-800 hover:bg-slate-50"
                        }`}
                    >
                      <FaChevronRight className="text-xs sm:text-sm" />
                    </button>
                  </>
                )}
              </motion.div>

              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`transition-all h-2 rounded-full ${currentIndex === index
                        ? "w-8 bg-linear-to-r from-purple-600 to-emerald-600"
                        : `w-2 ${isDark ? "bg-slate-600" : "bg-slate-300"}`
                        }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center py-12 rounded-2xl backdrop-blur-xl ${isDark ? "bg-slate-800/50" : "bg-white/60"
                }`}
            >
              <p className={`text-lg ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                No testimonials yet. Be the first to leave a review!
              </p>
            </motion.div>
          )}

          {/* BUTTON - Always visible */}
          <div className="text-center mt-10">
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all group hover:scale-105"
              style={{ cursor: 'pointer' }}
            >
              <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
              Leave a Review
            </button>
          </div>
        </div>
      </section>

      {/* Feedback Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className={`relative max-w-md w-full max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden ${
              isDark ? "bg-slate-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-4 border-b ${isDark ? "border-slate-700" : "border-slate-200"}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                  Share Your Feedback
                </h3>
                <button
                  onClick={closeModal}
                  className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"}`}
                >
                  <FaTimes className={isDark ? "text-slate-400" : "text-slate-600"} />
                </button>
              </div>
              <p className={`text-sm mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Your feedback helps me improve and grow
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  <FaUser className="inline mr-2 text-emerald-500" />
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 ${formErrors.name
                    ? "border-red-500 focus:ring-red-500"
                    : isDark
                      ? "bg-slate-900/50 border-slate-600 text-white focus:ring-purple-500"
                      : "bg-white/50 border-slate-300 text-slate-800 focus:ring-purple-500"
                    }`}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  <FaEnvelope className="inline mr-2 text-emerald-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g., john@example.com"
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 ${formErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : isDark
                      ? "bg-slate-900/50 border-slate-600 text-white focus:ring-purple-500"
                      : "bg-white/50 border-slate-300 text-slate-800 focus:ring-purple-500"
                    }`}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Role / Position *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., CEO, Product Manager"
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 ${formErrors.role
                    ? "border-red-500 focus:ring-red-500"
                    : isDark
                      ? "bg-slate-900/50 border-slate-600 text-white focus:ring-purple-500"
                      : "bg-white/50 border-slate-300 text-slate-800 focus:ring-purple-500"
                    }`}
                />
                {formErrors.role && <p className="text-red-500 text-xs mt-1">{formErrors.role}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        className={`text-2xl transition-all ${star <= formData.rating
                          ? "text-yellow-400"
                          : isDark ? "text-slate-600" : "text-slate-300"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                  <FaComment className="inline mr-2 text-emerald-500" />
                  Your Feedback *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Share your experience working with me..."
                  className={`w-full px-3 py-2 text-sm rounded-lg border transition-all focus:outline-none focus:ring-2 resize-none ${formErrors.content
                    ? "border-red-500 focus:ring-red-500"
                    : isDark
                      ? "bg-slate-900/50 border-slate-600 text-white focus:ring-purple-500"
                      : "bg-white/50 border-slate-300 text-slate-800 focus:ring-purple-500"
                    }`}
                />
                {formErrors.content && <p className="text-red-500 text-xs mt-1">{formErrors.content}</p>}
                <p className={`text-xs mt-1 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                  Minimum 10 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg bg-linear-to-r from-purple-600 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:scale-105"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Feedback
                    <FaPlus className="text-sm" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}