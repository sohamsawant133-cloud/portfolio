import { useState, useEffect, useRef, DragEvent, ChangeEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Terminal, UploadCloud, Trash2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('soham_portfolio_custom_avatar');
      if (saved) {
        setCustomImage(saved);
      }
    } catch (e) {
      console.error('Error loading portrait from local storage', e);
    }
  }, []);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please provide a valid image file!');
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setErrorMessage('Image too large! Use an image less than 4MB.');
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        setCustomImage(base64);
        try {
          localStorage.setItem('soham_portfolio_custom_avatar', base64);
        } catch (err) {
          console.error('Failed to store portrait image base64', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleResetImage = (e: MouseEvent) => {
    e.stopPropagation();
    setCustomImage(null);
    localStorage.removeItem('soham_portfolio_custom_avatar');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden pt-20">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-purple-200/50 dark:bg-purple-900/20 blur-[120px] pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-indigo-200/40 dark:bg-indigo-900/15 blur-[140px] pointer-events-none transition-colors duration-500"></div>

      {/* Grid Pattern overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(168,85,247,0.05)_1.5px,transparent_1.5px)] dark:bg-[linear-gradient(rgba(168,85,247,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(168,85,247,0.03)_1.5px,transparent_1.5px)] bg-[size:45px_45px] pointer-events-none opacity-50 z-0"></div>

      <div className="relative max-w-6xl mx-auto px-6 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Main Display Typography (Left) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 pt-10 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, delay: 0.1, type: "spring", bounce: 0.4 }}
              className="perspective-[1200px]"
            >
              <motion.h1
                whileHover={{ rotateX: 10, rotateY: -15, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="font-display font-black text-6xl sm:text-7xl xl:text-[100px] tracking-tighter text-gray-900 dark:text-white mb-6 leading-[0.95] transform-gpu cursor-default relative group"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div style={{ transform: 'translateZ(30px)' }} className="drop-shadow-xl relative z-20">
                  SOHAM
                </div>
                <div style={{ transform: 'translateZ(60px)' }} className="text-transparent text-stroke-purple-light dark:text-stroke-purple block mt-1 select-none relative z-30">
                  {/* 3D staggered shadow effect for depth */}
                  <span className="absolute inset-0 text-purple-600/30 blur-sm translate-x-2 translate-y-2 -z-30 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 pointer-events-none">SAWANT</span>
                  <span className="absolute inset-0 text-purple-600/40 translate-x-1 translate-y-1 -z-20 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500 pointer-events-none">SAWANT</span>
                  <span className="absolute inset-0 text-purple-500/60 translate-x-0.5 translate-y-0.5 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 pointer-events-none">SAWANT</span>
                  <span className="relative">SAWANT</span>
                </div>
              </motion.h1>
            </motion.div>

            {/* Dynamic Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
              className="font-sans font-light text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg mb-10 leading-relaxed"
            >
              An aspiring <span className="text-purple-600 dark:text-purple-300 font-semibold">Computer Science Engineer</span> pursuing a diploma in <span className="text-purple-600 dark:text-purple-300 font-semibold">DKTE YCP</span>. Building software solutions, database pipelines, and exploring real-world capabilities.
            </motion.p>

            {/* Interactive CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#skills"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-[0_5px_25px_rgba(168,85,247,0.35)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 font-display"
              >
                <span>My Core Skills</span>
                <ArrowRight size={16} />
              </a>
              <a
                href="#roadmap"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-400/40 text-purple-700 dark:text-purple-200 hover:text-purple-900 dark:hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Terminal size={14} className="text-purple-500 dark:text-purple-400" />
                <span>View Academic Journey</span>
              </a>
            </motion.div>
          </div>

          {/* Portrait Drag & Drop (Right) */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 perspective-[1000px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="relative w-72 sm:w-80 group/card transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Outer decorative glowing layer */}
              <div className="absolute -inset-2 bg-gradient-to-b from-purple-500 to-indigo-700 rounded-3xl blur-xl opacity-20 dark:opacity-30 group-hover/card:opacity-40 dark:group-hover/card:opacity-60 transition duration-500"></div>
              
              {/* Image Frame Container */}
              <div className="relative bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-purple-900/40 rounded-3xl overflow-hidden p-3 shadow-2xl dark:shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col pointer-events-auto">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative w-full aspect-[3/4] bg-gray-100 dark:bg-zinc-950 rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer select-none transition-all duration-300 ${
                    isDragging
                      ? 'bg-purple-100 dark:bg-purple-950/20 scale-[0.98]'
                      : 'hover:bg-gray-200 dark:hover:bg-zinc-900'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {customImage ? (
                    <img
                      src={customImage}
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-lg group-hover/card:scale-[1.03] transition-all duration-500 ease-out"
                    />
                  ) : !imageError ? (
                    <img
                      src="profile.png"
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover rounded-lg group-hover/card:scale-[1.03] transition-all duration-500 ease-out"
                    />
                  ) : (
                    /* High-fidelity responsive Vector SVG illustration */
                    <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-300 dark:from-zinc-900 dark:to-zinc-950 flex flex-col items-center justify-center p-6 relative">
                      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_60%)"></div>
                      <svg viewBox="0 0 100 100" className="w-36 h-36 mb-4 text-purple-600 dark:text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
                        <path d="M15 90 C 22 75, 22 68, 50 68 C 78 68, 78 75, 85 90" fill="var(--color-slate-900, #0f172a)" stroke="#8b5cf6" strokeWidth="1.5" />
                        <path d="M43 68 C 45 74, 55 74, 57 68" fill="#ffffff" />
                        <path d="M35 48 C 35 32, 65 32, 65 48 C 65 62, 35 62, 35 48 Z" fill="#d97706" opacity="0.35" />
                        <path d="M35 48 C 35 32, 65 32, 65 48 C 65 62, 35 62, 35 48 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M33 42 H 47 L 49 46 H 31 Z" fill="#000000" stroke="#8b5cf6" strokeWidth="1" />
                        <path d="M53 42 H 67 L 69 46 H 51 Z" fill="#000000" stroke="#8b5cf6" strokeWidth="1" />
                        <path d="M47 43 H 53" stroke="#8b5cf6" strokeWidth="1" />
                        <path d="M34 39 C 32 30, 48 24, 50 25 C 52 24, 68 30, 66 39 Z" fill="#020617" stroke="#4c1d95" strokeWidth="1" />
                      </svg>
                      
                      <span className="font-mono text-center text-xs text-purple-700 dark:text-purple-200 tracking-wider font-bold">
                        SOHAM SAWANT
                      </span>
                      <span className="font-sans text-center text-[10px] text-gray-500 dark:text-zinc-500 mt-1 uppercase tracking-widest">
                        DKTE YCP • CS Student
                      </span>
                    </div>
                  )}

                  {/* Clean hover indicator overlay */}
                  <div className="absolute inset-0 bg-white/60 dark:bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-10 backdrop-blur-[2px]">
                    <UploadCloud className="text-purple-600 dark:text-purple-400 mb-2 animate-pulse" size={32} />
                    <span className="font-sans font-bold text-sm text-gray-900 dark:text-white">Drag & Drop Image</span>
                    <span className="font-mono text-[10px] text-gray-600 dark:text-zinc-400 mt-1">or Click to Browse</span>
                  </div>

                  {/* Active Drag overlay representation */}
                  <AnimatePresence>
                    {isDragging && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-purple-100/90 dark:bg-purple-950/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-4 text-center border-2 border-purple-500 border-dashed rounded-xl"
                        style={{ pointerEvents: 'none' }}
                      >
                        <UploadCloud className="text-purple-600 dark:text-white mb-3 animate-bounce" size={44} />
                        <span className="font-sans font-extrabold text-sm text-purple-900 dark:text-white uppercase tracking-wider">Drop Your Portrait Here</span>
                        <span className="font-mono text-[10px] text-purple-700 dark:text-purple-200 mt-1.5">Supports PNG, JPG, WEBP</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Upload validation Error message feedback */}
                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-4 inset-x-4 bg-red-100/95 dark:bg-red-950/95 border border-red-500/50 p-2.5 rounded-xl z-30 text-center shadow-lg backdrop-blur-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="font-sans text-[11px] text-red-700 dark:text-red-200 font-medium block">{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Toggle reset custom action button */}
                  {customImage && (
                    <button
                      onClick={handleResetImage}
                      className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-white/90 dark:bg-black/95 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-300 hover:text-red-500 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-500/40 transition-all z-20 shadow-sm"
                      title="Reset avatar to default"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  {/* Absolute border hover glow overlay */}
                  <div className="absolute inset-0 border border-purple-200 dark:border-purple-500/20 rounded-xl pointer-events-none group-hover/card:border-purple-300 dark:group-hover/card:border-purple-400/50 transition-colors duration-300"></div>
                </div>
                
                {/* Floating Info tag below photo */}
                <div className="mt-4 flex items-center justify-between px-3 py-2 bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-800/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
                    <span className="font-mono text-[10px] text-gray-600 dark:text-zinc-400 font-bold uppercase tracking-wide">
                      {customImage ? 'Custom Portrait' : 'Status: Active'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
