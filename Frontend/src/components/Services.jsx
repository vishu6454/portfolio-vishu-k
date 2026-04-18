import { FaCode, FaPaintBrush, FaMobile, FaRocket, FaCloud, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const { isDark } = useTheme();

  const services = [
    {
      icon: FaCode,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies.",
      linear: "from-purple-500 to-pink-500",
      delay: 0
    },
    {
      icon: FaPaintBrush,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that enhance user experience.",
      linear: "from-emerald-500 to-cyan-500",
      delay: 0.1
    },
    {
      icon: FaMobile,
      title: "Mobile First",
      description: "Responsive designs for all devices and screen sizes.",
      linear: "from-blue-500 to-indigo-500",
      delay: 0.2
    },
    {
      icon: FaRocket,
      title: "Performance",
      description: "Optimized apps with fast loading and excellent SEO.",
      linear: "from-orange-500 to-red-500",
      delay: 0.3
    },
    {
      icon: FaCloud,
      title: "Cloud Solutions",
      description: "Scalable cloud-based applications for reliability.",
      linear: "from-cyan-500 to-blue-500",
      delay: 0.4
    },
    {
      icon: FaShieldAlt,
      title: "Security",
      description: "Secure applications with best practices and testing.",
      linear: "from-green-500 to-emerald-500",
      delay: 0.5
    }
  ];

  return (
    <section id="services" className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isDark 
        ? "bg-[#0f172a]" 
        : "bg-slate-50"
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark ? "opacity-15" : "opacity-5"
      }`}>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-violet-600 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-3 tracking-tight ${
            isDark ? "text-slate-100" : "text-slate-800"
          }`}>
            My <span className="text-transparent bg-linear-to-r from-violet-500 to-blue-500 bg-clip-text">Services</span>
          </h2>
          <p className={`text-sm sm:text-base lg:text-lg max-w-2xl mx-auto ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}>
            Comprehensive digital solutions designed to elevate your online presence 
            and drive business growth.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: service.delay }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group"
            >
              <div className={`rounded-2xl p-5 sm:p-6 shadow-sm border h-full flex flex-col items-center text-center hover:shadow-xl transition-all backdrop-blur-sm ${
                isDark 
                  ? "bg-slate-800/40 border-slate-700/50 hover:border-blue-500/30" 
                  : "bg-white/80 border-slate-200 hover:border-blue-500/30"
              }`}>
                <div className={`p-3 rounded-xl bg-linear-to-r ${service.linear} mb-4 transition-transform group-hover:scale-110 shadow-sm`}>
                  <service.icon className="text-white text-lg sm:text-xl" />
                </div>
                
                <h4 className={`font-bold text-lg sm:text-xl mb-3 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}>
                  {service.title}
                </h4>
                
                <p className={`text-sm leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}>
                  {service.description}
                </p>
                
                <div className="w-0 h-0.5 bg-linear-to-r from-violet-500 to-blue-500 mt-4 group-hover:w-full transition-all duration-300 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-10 sm:mt-12"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-violet-500/25 hover:-translate-y-1 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Project
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="group-hover:translate-x-1 transition-transform"
            >
              🚀
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}