import profileImg from "../assets/profile.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaCode, FaPalette, FaRocket, FaUsers } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const { isDark } = useTheme();

  const qualities = [
    { icon: FaCode, text: "Innovative Thinker", color: "from-violet-500 to-purple-500" },
    { icon: FaPalette, text: "Detail-Oriented Designer", color: "from-blue-500 to-cyan-500" },
    { icon: FaUsers, text: "Team Player", color: "from-indigo-500 to-blue-600" },
    { icon: FaRocket, text: "Customer-Centric", color: "from-purple-500 to-violet-500" }
  ];

  const stats = [
    { number: "Fresher", label: "Experience", linear: "from-violet-500 to-purple-500" },
    { number: "50+", label: "Projects", linear: "from-blue-500 to-indigo-500" },
    { number: "10+", label: "Happy Clients", linear: "from-cyan-500 to-blue-500" },
    { number: "15+", label: "Technologies", linear: "from-indigo-500 to-violet-500" }
  ];

  return (
    <section id="about" className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isDark 
        ? "bg-[#0f172a]" 
        : "bg-white"
    }`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark ? "opacity-10" : "opacity-5"
      }`}>
        <div className="absolute top-0 right-10 w-40 h-40 sm:w-64 sm:h-64 bg-violet-600 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 sm:w-96 sm:h-96 bg-blue-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Image Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-3xl blur-lg opacity-40" />
            <motion.img 
              src={profileImg} 
              className={`w-full rounded-3xl shadow-2xl mx-auto border-2 relative z-10 object-cover aspect-square ${
                isDark ? "border-slate-800" : "border-slate-100"
              }`}
              alt="About Vishu"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              loading="lazy"
            />
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 sm:p-5 rounded-2xl shadow-xl z-20"
              initial={{ opacity: 0, scale: 0, rotate: -15 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="text-xl sm:text-2xl font-bold">Fresher</div>
              <div className="text-purple-100 text-xs font-medium uppercase tracking-wider mt-1">Experience</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-5 rounded-2xl shadow-xl z-20"
              initial={{ opacity: 0, scale: 0, rotate: 15 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <div className="text-xl sm:text-2xl font-bold">50+</div>
              <div className="text-blue-100 text-xs font-medium uppercase tracking-wider mt-1">Projects</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full" />
            <h4 className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>Discover</h4>
          </motion.div>

          <motion.h2 
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight ${
              isDark ? "text-slate-100" : "text-slate-800"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            About <span className="text-transparent bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text">Me</span>
          </motion.h2>
          
          <motion.h3 
            className={`text-xl sm:text-2xl font-semibold mb-6 ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Frontend Developer | Creative Designer | Tech Innovator
          </motion.h3>

          <motion.p 
            className={`text-base sm:text-lg mb-8 leading-relaxed ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            I'm passionate about creating digital experiences that are not only visually 
            stunning but also highly functional and user-friendly. With a keen eye for 
            design and a love for clean code, I specialize in turning complex problems 
            into simple, beautiful solutions.
          </motion.p>

          {/* Qualities Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {qualities.map((quality, index) => (
              <motion.div 
                key={index}
                className={`flex items-center gap-4 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all border ${
                  isDark ? "bg-[#1e293b]/50 border-slate-800/50 hover:bg-[#1e293b]" : "bg-slate-50 border-slate-100 hover:bg-white"
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${quality.color} shadow-sm`}>
                  <quality.icon className="text-white text-lg" />
                </div>
                <span className={`text-sm font-semibold ${
                  isDark ? "text-slate-200" : "text-slate-700"
                }`}>{quality.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-all border ${
                  isDark ? "bg-[#1e293b]/50 border-slate-800/50 hover:bg-[#1e293b]" : "bg-slate-50 border-slate-100 hover:bg-white"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.linear} bg-clip-text text-transparent mb-1`}>
                  {stat.number}
                </div>
                <div className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.a 
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-violet-500/25 transition-all group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1 }}
          >
            Explore My Services
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="group-hover:translate-x-1 transition-transform"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}