import { Mail, ArrowUpCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-50 dark:bg-[#050505] border-t border-gray-200 dark:border-purple-900/20 py-12 overflow-hidden transition-colors duration-300">
      {/* Footer Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1.5px,transparent_1.5px)] dark:bg-[linear-gradient(rgba(24,18,36,0.03)_1.5px,transparent_1.5px)] bg-[size:30px_30px] pointer-events-none opacity-20"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Core Attribution */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="font-display font-medium text-base text-gray-900 dark:text-white tracking-tight">
              Soham <span className="text-purple-600 dark:text-purple-400 font-bold">Sawant</span>
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
            <span className="font-sans text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-widest">Active Developer</span>
          </div>
          <p className="font-sans font-light text-[11px] text-gray-500 dark:text-zinc-500 tracking-wide">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved under local education standards.
          </p>
          <p className="font-sans font-light text-[10px] text-gray-400 dark:text-zinc-600 mt-1">
            DKTE Society's Yashwantrao Chavan Polytechnic (YCP) Diploma Program Student.
          </p>
        </div>

        {/* Dynamic actions: Scroll back to top & Quick contact links */}
        <div className="flex items-center gap-6">
          <a
            href="mailto:sohamsawant133@gmail.com"
            className="font-mono text-xs text-gray-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <Mail size={12} className="text-purple-500" />
            <span>sohamsawant133@gmail.com</span>
          </a>

          <button
            onClick={handleScrollTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-purple-950/20 border border-gray-200 dark:border-purple-900/20 text-[10px] font-mono hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-purple-300 hover:border-purple-400 dark:hover:border-purple-500/45 transition-all duration-300 group shadow-sm dark:shadow-none"
          >
            <ArrowUpCircle size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>TOP</span>
          </button>
        </div>

      </div>
    </footer>
  );
}
