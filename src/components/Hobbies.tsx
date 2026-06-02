import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { HOBBIES } from '../data';

function HobbyIcon({ name, size = 32 }: { name: string; size?: number }) {
  switch (name) {
    case 'Activity':
      return <LucideIcons.Activity size={size} />;
    case 'BrainCircuit':
      return <LucideIcons.Bot size={size} />;
    case 'Music':
      return <LucideIcons.Music size={size} />;
    case 'Gamepad2':
      return <LucideIcons.Gamepad2 size={size} />;
    default:
      return <LucideIcons.Smile size={size} />;
  }
}

export default function Hobbies() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, rotateX: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      scale: 1,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="hobbies" className="py-24 bg-transparent relative z-10 w-full perspective-[1000px]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl text-gray-900 dark:text-white tracking-tight mb-3 uppercase"
          >
            Hobbies & Interests
          </motion.h2>
          <div className="w-16 h-[3px] bg-purple-500 mb-6"></div>
          <p className="text-gray-600 dark:text-zinc-500 font-sans font-light text-center text-sm sm:text-base max-w-lg">
            What I enjoy doing besides coding. These activities keep me refreshed, sharp, and creatively active.
          </p>
        </div>

        {/* Hobbies Cards Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1200px]"
        >
          {HOBBIES.map((hobby, idx) => {
            return (
              <motion.div
                key={hobby.title}
                variants={itemVariants}
                whileHover={{ y: -8, rotateX: 5, rotateY: -5, scale: 1.05, z: 30 }}
                className="group relative rounded-2xl overflow-hidden bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-md border border-gray-200 dark:border-purple-900/30 p-6 flex flex-col justify-between shadow-xl dark:shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:border-purple-500/50 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] transition-all duration-300 transform-gpu cursor-default"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Background decorative diagonal gradient streak on card hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-transparent dark:from-purple-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Top Section */}
                <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                  <div className="text-purple-600 dark:text-purple-400 mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-300 group-hover:scale-110 transition-transform duration-300 flex items-center justify-between">
                    <HobbyIcon name={hobby.icon} />
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-700/50 px-2.5 py-1 rounded-full shadow-sm">
                      {hobby.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">
                    {hobby.title}
                  </h3>
                  <p className="font-sans font-light text-xs text-gray-600 dark:text-zinc-400 leading-relaxed mb-4 min-h-[60px]">
                    {hobby.description}
                  </p>
                </div>

                {/* Tools/Items Map */}
                <div className="relative z-10 pt-4 border-t border-gray-100 dark:border-purple-900/40" style={{ transform: 'translateZ(15px)' }}>
                  <div className="flex flex-wrap gap-2">
                    {hobby.tools?.map((tool, i) => (
                      <span key={i} className="text-[10px] font-sans font-semibold text-gray-700 dark:text-purple-200 bg-gray-100 dark:bg-purple-950/60 px-2.5 py-1 rounded-md border border-gray-200 dark:border-purple-800/30 group-hover:border-purple-300/50 transition-colors duration-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual Accent Bottom decoration */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-600 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
