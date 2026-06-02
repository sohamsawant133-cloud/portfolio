import { motion, useMotionValue, useTransform } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Code, Cpu, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import React, { useRef } from 'react';

const AnimatedStatCard = ({ icon: Icon, title, value, delay }: { icon: any, title: string, value: string, delay: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useTransform(x, [-0.5, 0.5], [10, -10]);
  const mouseYSpring = useTransform(y, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay, type: "spring" } }
      }}
      className="perspective-[1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: mouseYSpring, rotateY: mouseXSpring, transformStyle: "preserve-3d" }}
        className="p-5 rounded-2xl bg-white/40 dark:bg-[#1A1A1A]/40 backdrop-blur-md border border-gray-200 dark:border-purple-900/30 flex items-center gap-4 group hover:bg-white/60 dark:hover:bg-[#1A1A1A]/60 transition-colors duration-300"
      >
        <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300 transform-gpu" style={{ transform: "translateZ(20px)" }}>
          <Icon size={20} />
        </div>
        <div style={{ transform: "translateZ(10px)" }}>
          <p className="font-sans text-xs text-gray-500 dark:text-zinc-500">{title}</p>
          <p className="font-display font-bold text-gray-900 dark:text-zinc-200 text-lg">{value}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 10 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, type: "spring", bounce: 0.4 } }
  };

  return (
    <section id="about" className="py-24 bg-transparent relative z-10 overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 perspective-[1000px]">
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl text-gray-900 dark:text-white tracking-tight mb-3 uppercase"
          >
            About Me
          </motion.h2>
          <div className="w-16 h-[3px] bg-purple-500"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Context Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 space-y-8 bg-white/60 dark:bg-[#0F0F0F]/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-200 dark:border-purple-900/30 shadow-2xl transform-gpu relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <motion.h3 variants={itemVariants} className="font-display font-medium text-2xl text-purple-600 dark:text-purple-300">
              Pioneering My Educational Path
            </motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-4 text-gray-700 dark:text-zinc-400 font-sans font-light text-base leading-relaxed text-justify relative z-10">
              {PERSONAL_INFO.aboutText.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-purple-900/20 perspective-[1000px]">
              <motion.div 
                whileHover={{ rotateX: 5, rotateY: 5, scale: 1.03, z: 20 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 dark:bg-[#1A1A1A]/80 border border-gray-200 dark:border-purple-900/30 hover:border-purple-400/50 hover:shadow-lg dark:hover:shadow-[0_10px_20px_rgba(168,85,247,0.15)] transition-all duration-300 transform-gpu"
              >
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h4 className="font-display font-medium text-gray-900 dark:text-zinc-300 text-sm">Diploma Program</h4>
                  <p className="font-sans text-xs text-gray-500 dark:text-zinc-500 mt-1">CS Diploma @ DKTE YCP</p>
                  <p className="font-mono text-purple-600 dark:text-purple-400 font-medium text-[11px] mt-1.5">2024 - 2027</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.03, z: 20 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50/80 dark:bg-[#1A1A1A]/80 border border-gray-200 dark:border-purple-900/30 hover:border-purple-400/50 hover:shadow-lg dark:hover:shadow-[0_10px_20px_rgba(168,85,247,0.15)] transition-all duration-300 transform-gpu"
              >
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <Calendar size={22} />
                </div>
                <div>
                  <h4 className="font-display font-medium text-gray-900 dark:text-zinc-300 text-sm">Current Status</h4>
                  <p className="font-sans text-xs text-gray-500 dark:text-zinc-500 mt-1">Currently in 5th Semester</p>
                  <p className="font-mono text-purple-600 dark:text-purple-400 font-medium text-[11px] mt-1.5">Focusing on Core Systems</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Quick Stats / Highlights Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Visual Location Card */}
            <motion.div 
              variants={itemVariants}
              className="relative overflow-hidden rounded-3xl bg-gray-900 dark:bg-black border border-gray-200 dark:border-purple-900/30 aspect-video md:aspect-auto md:h-[200px] shadow-xl group"
            >
              <img 
                src="https://images.unsplash.com/photo-1543363136-3fde621c7fa4?auto=format&fit=crop&q=80&w=1000"
                alt="Manchester" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin size={18} className="text-purple-400" />
                  <span className="font-display font-medium">Ichalkaranji, India</span>
                </div>
                <p className="font-sans text-xs text-gray-300 mt-2">Based in the Manchester of Maharashtra.</p>
              </div>
            </motion.div>

            {/* Micro Stats */}
            <AnimatedStatCard icon={Code} title="Main Interest" value="Full Stack & AI" delay={0.2} />
            <AnimatedStatCard icon={Terminal} title="Favorite Editor" value="VS Code" delay={0.3} />
            <AnimatedStatCard icon={Cpu} title="Focus Area" value="System Design" delay={0.4} />

          </motion.div>
        </div>
      </div>
    </section>
  );
}
