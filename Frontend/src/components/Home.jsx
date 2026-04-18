import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin, FaDownload, FaArrowDown } from "react-icons/fa";
import profileImg from "../assets/profile.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useTheme } from "../context/ThemeContext";
import { useRef } from "react";

export default function Home() {
  const { isDark } = useTheme();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const socialLinks = [
    { icon: FaFacebook, href: "#", color: "from-blue-600 to-blue-400" },
    { icon: FaInstagram, href: "#", color: "from-pink-600 to-purple-400" },
    { icon: FaWhatsapp, href: "#", color: "from-green-600 to-emerald-400" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/vishukanoujiya", color: "from-blue-700 to-cyan-400" }
  ];

  return (
    <section 
      id="home" 
      ref={targetRef}
      className={`min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 lg:px-8 py-16 lg:py-0 relative overflow-hidden ${
        isDark 
          ? "bg-[#0f172a]" 
          : "bg-slate-50"
      }`}
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-violet-600 rounded-full blur-[100px] opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-600 rounded-full blur-[100px] opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="max-w-2xl mx-auto lg:mx-0 z-10 text-center lg:text-left mt-16 lg:mt-0">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-xl sm:text-2xl font-medium mb-2 ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}
        >
          Hello, I'm
        </motion.h3>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-4xl sm:text-5xl lg:text-7xl font-bold mb-3 leading-tight ${
            isDark ? "text-slate-100" : "text-slate-800"
          }`}
        >
          Vishu{" "}
          <span className={`text-transparent bg-gradient-to-r ${
            isDark ? "from-violet-400 to-blue-400" : "from-violet-600 to-blue-600"
          } bg-clip-text`}>
            Kanoujiya
          </span>
        </motion.h1>

        <div className="h-10 sm:h-12 mb-4">
          <TypeAnimation
            sequence={[
              'Frontend Developer',
              2000,
              'UI/UX Designer',
              2000,
              'React Specialist',
              2000,
              'Creative Coder',
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className={`text-lg sm:text-xl lg:text-2xl font-semibold opacity-90 ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Crafting digital experiences that blend{" "}
          <span className={`font-semibold ${
            isDark ? "text-violet-400" : "text-violet-600"
          }`}>
            beautiful design
          </span>{" "}
          with{" "}
          <span className={`font-semibold ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}>
            cutting-edge technology
          </span>
          . I create responsive, user-centric web applications.
        </motion.p>

        <motion.div 
          className="flex justify-center lg:justify-start gap-4 my-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`p-3 rounded-xl bg-gradient-to-br ${social.color} shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 block`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon size={20} className="text-white" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="/Vishu_Kanoujiya_Resume.pdf"
            download="Vishu_Kanoujiya_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-blue-500/25 transition-all group"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaDownload className="text-sm group-hover:animate-bounce" />
            Download Resume
          </motion.a>
          
          <motion.a
            href="#about"
            className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-medium transition-all backdrop-blur-sm ${
              isDark 
                ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white" 
                : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
            }`}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            Explore Portfolio
            <FaArrowDown className="text-sm group-hover:translate-y-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Profile Image with Glow Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
        className="relative mt-16 lg:mt-0"
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-3xl blur-xl opacity-60"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          <motion.img
            src={profileImg}
            className={`w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl object-cover border-2 shadow-2xl relative z-10 ${
              isDark ? "border-slate-700/50" : "border-white/80"
            }`}
            alt="Vishu Kanoujiya"
            whileHover={{ scale: 1.02, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`text-xs font-medium uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>Scroll</div>
        <div className={`w-5 h-8 border-2 rounded-full flex justify-center ${
          isDark ? "border-slate-600" : "border-slate-400"
        }`}>
          <motion.div
            className={`w-1 h-2 rounded-full mt-2 ${
              isDark ? "bg-blue-400" : "bg-blue-600"
            }`}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}