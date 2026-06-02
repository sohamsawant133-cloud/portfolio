import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { ROADMAP } from '../data';

export default function Roadmap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, rotateY: -10 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotateY: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="roadmap" className="py-24 bg-transparent relative z-10 perspective-[1000px]">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl text-gray-900 dark:text-white tracking-tight mb-3 uppercase"
          >
            Academic Roadmap
          </motion.h2>
          <div className="w-16 h-[3px] bg-purple-500 mb-6"></div>
          <p className="text-gray-600 dark:text-zinc-500 font-sans font-light text-center text-sm sm:text-base max-w-lg">
            Interactive journey tracking major educational checkpoints. Hover over any stage to view highlights.
          </p>
        </div>

        {/* Roadmap Connected Node Container */}
        <div className="relative mt-12 pl-4 sm:pl-0 flex flex-col pt-12 lg:pt-0">
          
          {/* Vertical Connecting line (Middle on desktop, Left on Mobile) */}
          <div className="absolute left-6 sm:left-1/2 top-0 h-full w-[2px] bg-gray-200 dark:bg-[#1A1A1A] -translate-x-1/2 pointer-events-none">
            {/* Animated purple neon energetic pulse on the line */}
            <motion.div
              animate={{ top: ['0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b from-transparent via-purple-400 dark:via-purple-500 to-transparent shadow-[0_0_12px_#af52de]"
            ></motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-16 perspective-[1200px]"
          >
            {ROADMAP.map((node, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div variants={itemVariants} key={node.id} className="relative flex flex-col sm:flex-row items-start sm:items-center transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Timeline bullet checkpoint */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-20">
                    <motion.button
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                      whileHover={{ scale: 1.25 }}
                      animate={{
                        boxShadow: activeNode === node.id 
                          ? '0 0 20px rgba(168,85,247,0.5)'
                          : '0 0 0px rgba(0,0,0,0)',
                        borderColor: activeNode === node.id 
                          ? '#c084fc'
                          : '' // default applies via classes
                      }}
                      className={`w-12 h-12 rounded-full border-2 bg-white dark:bg-[#0F0F0F] flex items-center justify-center transition-all duration-300 border-gray-300 dark:border-zinc-800`}
                    >
                      <BookOpen className="text-gray-500 dark:text-zinc-400 w-5 h-5 flex-shrink-0" />
                    </motion.button>
                  </div>

                  {/* Empty item for layout alignment on wider screens (Desktop alternation) */}
                  <div className={`hidden sm:block w-1/2 ${isEven ? 'pr-16 order-1 text-right' : 'order-3'}`}></div>

                  {/* Interactive card section */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:order-3 sm:pl-16' : 'sm:order-1 sm:pr-16'} order-2`}>
                    <motion.div
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      whileHover={{ y: -6, borderColor: 'rgba(168,85,247,0.4)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F0F0F] border transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-sm ${
                        activeNode === node.id 
                          ? 'border-purple-300 dark:border-purple-500/40 shadow-[0_10px_30px_rgba(168,85,247,0.15)]'
                          : 'border-gray-200 dark:border-purple-900/10'
                      }`}
                    >
                      {/* Header values */}
                      <span className="font-mono text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wider block mb-2">
                        {node.period}
                      </span>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                        {node.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-500 dark:text-zinc-500 font-medium mt-1">
                        {node.institution}
                      </p>

                      <p className="font-sans text-[13px] text-gray-600 dark:text-zinc-400 font-light mt-3 leading-relaxed">
                        {node.description}
                      </p>

                      {/* Dynamic hover-expandable detail items with AnimatePresence */}
                      <div className="overflow-hidden mt-4">
                        <motion.div
                          initial={false}
                          animate={{
                            height: activeNode === node.id ? 'auto' : 0,
                            opacity: activeNode === node.id ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="space-y-2"
                        >
                          <div className="pt-4 border-t border-gray-100 dark:border-purple-950/40 space-y-2">
                            {node.details.map((detail, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2 text-xs text-gray-600 dark:text-zinc-400 font-sans font-light">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500/80 mt-1.5 flex-shrink-0"></div>
                                <p className="leading-normal">{detail}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Expand guide for mobile devices */}
                      {activeNode !== node.id && (
                        <p className="text-[10px] text-gray-400 dark:text-zinc-600 font-mono mt-3 flex items-center gap-1">
                          <span>Hover to expand highlights</span>
                          <ArrowUpRight size={10} />
                        </p>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
