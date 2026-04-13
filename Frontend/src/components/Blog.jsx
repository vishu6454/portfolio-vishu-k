import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const blogPosts = [
  {
    title: "Building Modern React Applications with Tailwind CSS",
    excerpt: "Learn how to create stunning, responsive UIs using React and Tailwind CSS with best practices.",
    date: "Dec 15, 2024",
    author: "Vishu Kanoujiya",
    readTime: "5 min read",
    category: "React"
  },
  {
    title: "The Art of UI Animations with Framer Motion",
    excerpt: "Master the art of creating smooth, engaging animations that enhance user experience.",
    date: "Dec 10, 2024",
    author: "Vishu Kanoujiya",
    readTime: "4 min read",
    category: "Animation"
  },
  {
    title: "10 Tips for Better Frontend Performance",
    excerpt: "Optimize your web applications with these proven techniques for faster load times.",
    date: "Dec 5, 2024",
    author: "Vishu Kanoujiya",
    readTime: "6 min read",
    category: "Performance"
  }
];

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const { isDark } = useTheme();

  return (
    <section id="blog" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isDark 
        ? "bg-linear-to-br from-slate-900 via-purple-900 to-emerald-900" 
        : "bg-linear-to-br from-slate-50 via-purple-50 to-emerald-50"
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 ${
            isDark ? "text-white" : "text-slate-800"
          }`}>
            Latest <span className="text-transparent bg-linear-to-r from-purple-600 to-emerald-600 bg-clip-text">Articles</span>
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}>
            Thoughts, insights, and tutorials on web development
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group rounded-2xl overflow-hidden shadow-lg transition-all backdrop-blur-sm ${
                isDark ? "bg-slate-800/50 hover:bg-slate-800" : "bg-white/80 hover:shadow-xl"
              }`}
            >
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs mb-3 flex-wrap">
                  <span className={`px-2 py-1 rounded-lg ${
                    isDark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"
                  }`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500">
                    <FaCalendarAlt className="text-xs" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <h3 className={`font-bold text-lg mb-2 group-hover:text-emerald-500 transition-colors ${
                  isDark ? "text-white" : "text-slate-800"
                }`}>
                  {post.title}
                </h3>
                
                <p className={`text-sm mb-4 line-clamp-2 ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FaUser />
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    className={`text-sm font-medium flex items-center gap-1 ${
                      isDark ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    Read More <FaArrowRight className="text-xs" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-xl font-medium transition-all ${
              isDark 
                ? "border border-slate-600 text-slate-300 hover:bg-slate-800" 
                : "border border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            View All Articles →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}