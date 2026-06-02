import { useState, useEffect, useContext } from 'react';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Hobbies', href: '#hobbies' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-gray-200 dark:border-purple-900/30 shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo/Branding */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] group-hover:scale-105 transition-all duration-300">
            <span className="font-display font-bold text-white text-lg">P</span>
          </div>
          <span className="font-display font-medium text-lg leading-none tracking-tight text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
            Portfolio
          </span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-sans font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 tracking-wide transition-colors duration-300 relative py-2 block group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button & Theme Toggle (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-purple-950/40 border-gray-200 dark:border-purple-500/30 text-gray-600 dark:text-purple-200 hover:bg-gray-200 dark:hover:bg-purple-900/40 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          
          <a
            href="mailto:sohamsawant133@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-purple-950/40 border border-gray-200 dark:border-purple-500/30 text-xs font-semibold text-gray-800 dark:text-purple-200 hover:bg-gray-200 dark:hover:bg-purple-900/40 dark:hover:border-purple-400/50 transition-all duration-300"
          >
            <Mail size={14} />
            <span>Connect</span>
          </a>
        </div>

        {/* Hamburger Menu & Theme (Mobile) */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-black/95 border-b border-gray-200 dark:border-purple-950/50 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="font-sans font-medium text-base text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-purple-950/50 flex gap-4">
                <a
                  href="mailto:sohamsawant133@gmail.com"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg text-sm font-semibold text-white shadow-lg shadow-purple-900/30"
                >
                  <Mail size={16} />
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
