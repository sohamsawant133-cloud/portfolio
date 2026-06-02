import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { SKILLS } from '../data';

// Dynically map string icon names to Lucide icons
function SkillIcon({ name, size = 28 }: { name: string; size?: number }) {
  switch (name) {
    case 'Code':
      return <LucideIcons.Code size={size} />;
  case 'Terminal':
      return <LucideIcons.Terminal size={size} />;
    case 'Coffee':
      return <LucideIcons.Coffee size={size} />;
    case 'Box':
      return <LucideIcons.Box size={size} />;
    case 'Database':
      return <LucideIcons.Database size={size} />;
    case 'FileCode':
      return <LucideIcons.FileCode size={size} />;
    default:
      return <LucideIcons.Terminal size={size} />;
  }
}

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 120 }
    }
  };

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-300">
      {/* Decorative side accent lines */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-200/50 dark:bg-purple-900/5 blur-[120px] pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-indigo-200/50 dark:bg-indigo-900/5 blur-[120px] pointer-events-none transition-colors duration-500"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl text-gray-900 dark:text-white tracking-tight mb-3 uppercase"
          >
            Technical Competence
          </motion.h2>
          <div className="w-16 h-[3px] bg-purple-500 mb-6"></div>
          <p className="text-gray-600 dark:text-zinc-500 font-sans font-light text-center text-sm sm:text-base max-w-lg">
            Core mathematical and computational proficiencies developed throughout academic studies.
          </p>
        </div>

        {/* Skill Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-[1200px]"
        >
          {SKILLS.map((skill, idx) => {
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ y: -8, rotateX: 5, rotateY: -5, scale: 1.03, z: 20 }}
                className="group relative transform-gpu cursor-default"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Neon background hover glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 dark:from-purple-600 dark:to-indigo-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition duration-500"></div>

                <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-purple-900/30 shadow-md hover:shadow-xl dark:shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300">
                  
                  {/* Top Header Card Info */}
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/30 group-hover:bg-purple-600 dark:group-hover:bg-purple-900/40 group-hover:text-white dark:group-hover:text-purple-300 transition-colors duration-300 shadow-sm">
                        <SkillIcon name={skill.icon} />
                      </div>
                      <span className="font-mono text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-widest bg-gray-100 dark:bg-black px-2.5 py-1 rounded-md border border-gray-200 dark:border-zinc-800">
                        {skill.category}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="font-sans font-light text-xs sm:text-sm text-gray-600 dark:text-zinc-400 leading-relaxed mb-6">
                      {skill.description}
                    </p>
                  </div>

                  {/* Proficiency slider indicator bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider">Proficiency</span>
                      <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-300">{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-zinc-900 rounded-full overflow-hidden border border-transparent dark:border-zinc-800/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
