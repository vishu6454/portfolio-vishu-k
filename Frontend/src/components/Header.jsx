import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "services", "skills", "portfolio", "contact"];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#portfolio", id: "portfolio" },
    { name: "Contact", href: "#contact", id: "contact" }
  ];

  const handleNavClick = (href) => {
    setNavOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-700/50" 
          : "bg-linear-to-r from-purple-600 to-emerald-600 dark:from-purple-900 dark:to-emerald-900"
      }`}
    >
      <motion.a 
        href="#home" 
        className="font-bold text-2xl sm:text-3xl bg-linear-to-r from-emerald-600 to-purple-600 dark:from-emerald-300 dark:to-purple-300 bg-clip-text text-transparent"
        whileHover={{ scale: 1.05 }}
        onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
      >
        VK.
      </motion.a>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-4">
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
            className={`relative text-sm font-medium px-3 py-2 transition-colors ${
              activeSection === item.id
                ? "text-emerald-600 dark:text-emerald-400"
                : scrolled 
                  ? "text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400" 
                  : "text-white hover:text-emerald-300"
            }`}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {item.name}
            {activeSection === item.id && (
              <motion.span
                layoutId="activeSection"
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full ${
                  scrolled ? "bg-linear-to-r from-emerald-600 to-purple-600" : "bg-emerald-300"
                }`}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.a>
        ))}
        
        <motion.button
          onClick={toggleTheme}
          className={`ml-2 p-2 rounded-xl transition-all ${
            scrolled 
              ? "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" 
              : "bg-white/20 hover:bg-white/30"
          }`}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDark ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-purple-100 text-lg" />}
        </motion.button>
      </nav>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 lg:hidden">
        <motion.button
          onClick={toggleTheme}
          className={`p-2 rounded-xl ${
            scrolled ? "bg-slate-100 dark:bg-slate-800" : "bg-white/20"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {isDark ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-purple-100 text-lg" />}
        </motion.button>
        
        <motion.button 
          className={`z-50 ${scrolled ? "text-slate-700 dark:text-slate-300" : "text-white"}`}
          onClick={() => setNavOpen(!navOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {navOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {navOpen && (
          <motion.nav
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-screen w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md lg:hidden flex flex-col pt-20 px-6 gap-2 shadow-2xl border-l border-slate-200 dark:border-slate-700 z-40"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`py-3 text-base font-semibold transition-colors border-b border-slate-100 dark:border-slate-800 ${
                  activeSection === item.id
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-700 dark:text-slate-300"
                }`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}