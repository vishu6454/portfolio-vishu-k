import { useRef, useState } from 'react';
import { 
  FaDownload, FaPaperPlane, FaCheck, FaSpinner, FaPhone, 
  FaEnvelope, FaMapMarkerAlt, FaClock, FaShieldAlt,
  FaGithub, FaLinkedin, FaTwitter, FaInstagram
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { toast, Toaster } from 'react-hot-toast';

export default function Contact() {
  const form = useRef();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { isDark } = useTheme();

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-vishu-k.onrender.com/api';

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Name is required';
    }

    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  async function sendEmail(e) {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSending(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      let result;
      const text = await res.text();

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (res.ok && result.success) {
        setIsSent(true);
        setFormData({
          user_name: '',
          user_email: '',
          subject: '',
          message: ''
        });

        toast.success("Message sent successfully!");
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSent(false), 3000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }

    } catch (err) {
      console.error(err);

      let errorMsg = "Network error. ";

      if (err.name === "AbortError") {
        errorMsg = "Request timeout. Server took too long.";
      } else if (err.message === "Failed to fetch") {
        errorMsg = "Cannot connect to backend server.";
      } else {
        errorMsg += err.message;
      }

      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      
      <section id="contact" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isDark 
          ? "bg-[#0f172a]" 
          : "bg-slate-50"
      }`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-violet-600 rounded-full blur-[100px] opacity-20" />
          <div className="absolute bottom-20 right-10 w-56 h-56 bg-blue-600 rounded-full blur-[100px] opacity-20" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className={`text-4xl lg:text-5xl font-bold mb-3 tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-800"
            }`}>
              Get In <span className="text-transparent bg-linear-to-r from-violet-500 to-blue-500 bg-clip-text">Touch</span>
            </h2>
            <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}>
              Have a project in mind? I'd love to hear from you. Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className={`p-6 rounded-2xl backdrop-blur-xl ${
                isDark ? "bg-slate-800/50 border border-slate-700/50" : "bg-white/60 border border-slate-200"
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}>
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 text-white shadow-sm">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Email</p>
                      <p className={`font-medium ${isDark ? "text-white" : "text-slate-800"}`}>vishu@example.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 text-white shadow-sm">
                      <FaPhone />
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Phone</p>
                      <p className={`font-medium ${isDark ? "text-white" : "text-slate-800"}`}>+91 12345 67890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 text-white shadow-sm">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Location</p>
                      <p className={`font-medium ${isDark ? "text-white" : "text-slate-800"}`}>India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 text-white shadow-sm">
                      <FaClock />
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>Working Hours</p>
                      <p className={`font-medium ${isDark ? "text-white" : "text-slate-800"}`}>Mon-Fri: 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`p-6 rounded-2xl backdrop-blur-xl ${
                isDark ? "bg-slate-800/50 border border-slate-700/50" : "bg-white/60 border border-slate-200"
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}>
                  Connect With Me
                </h3>
                <div className="flex gap-3">
                  <motion.a
                    href="https://github.com/vishukanoujiya"
                    target="_blank"
                    className="p-3 rounded-xl bg-linear-to-r from-gray-700 to-gray-900 text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/vishukanoujiya"
                    target="_blank"
                    className="p-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-800 text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaLinkedin />
                  </motion.a>
                  <motion.a
                    href="#"
                    target="_blank"
                    className="p-3 rounded-xl bg-linear-to-r from-sky-500 to-sky-700 text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaTwitter />
                  </motion.a>
                  <motion.a
                    href="#"
                    target="_blank"
                    className="p-3 rounded-xl bg-linear-to-r from-pink-500 to-pink-700 text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <FaInstagram />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={sendEmail} className={`p-6 rounded-2xl backdrop-blur-xl ${
                isDark ? "bg-slate-800/50 border border-slate-700/50" : "bg-white/60 border border-slate-200"
              }`}>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                        errors.user_name
                          ? "border-red-500 focus:ring-red-500"
                          : isDark
                          ? "bg-slate-900/50 border-slate-600 text-white focus:ring-blue-500"
                          : "bg-white/50 border-slate-300 text-slate-800 focus:ring-blue-500"
                      }`}
                    />
                    {errors.user_name && (
                      <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                        errors.user_email
                          ? "border-red-500 focus:ring-red-500"
                          : isDark
                          ? "bg-slate-900/50 border-slate-600 text-white focus:ring-blue-500"
                          : "bg-white/50 border-slate-300 text-slate-800 focus:ring-blue-500"
                      }`}
                    />
                    {errors.user_email && (
                      <p className="text-red-500 text-xs mt-1">{errors.user_email}</p>
                    )}
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                        isDark
                          ? "bg-slate-900/50 border-slate-600 text-white focus:ring-blue-500"
                          : "bg-white/50 border-slate-300 text-slate-800 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                      rows="5"
                      className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 resize-none ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500"
                          : isDark
                          ? "bg-slate-900/50 border-slate-600 text-white focus:ring-blue-500"
                          : "bg-white/50 border-slate-300 text-slate-800 focus:ring-blue-500"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <p className="text-red-500 text-sm">{error}</p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-4 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                      isSending ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-1"
                    }`}
                    whileHover={{ scale: isSending ? 1 : 1.02 }}
                    whileTap={{ scale: isSending ? 1 : 0.98 }}
                  >
                    {isSending ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                      </>
                    ) : isSent ? (
                      <>
                        <FaCheck />
                        Sent Successfully!
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}