import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { PROJECTS, Project } from '../data';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D rotation effects on hover
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
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 15 }
        }
      }}
      className={`group relative perspective-[1200px] ${project.bentoStyle}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: mouseYSpring,
          rotateY: mouseXSpring,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full min-h-[300px] bg-white/10 dark:bg-[#0A0A0A]/80 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-purple-900/30 overflow-hidden shadow-xl dark:shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/50 hover:shadow-[0_20px_40px_rgba(168,85,247,0.2)] transition-colors duration-300 transform-gpu cursor-default flex flex-col"
      >
        {/* Project Image as Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10 transition-opacity duration-300"></div>
          <motion.img 
             src={project.image} 
             alt={project.title}
             className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-20 flex-1 flex flex-col justify-end p-6 sm:p-8 transform-gpu" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white group-hover:text-purple-300 transition-colors duration-300 drop-shadow-md">
              {project.title}
            </h3>
            
            <div className="flex gap-2">
              {project.githubLink && (
                <a 
                  href={project.githubLink}
                  className="p-2 rounded-full bg-white/10 hover:bg-purple-500/40 text-white backdrop-blur-sm transition-colors border border-white/10 hover:border-purple-400/50"
                  aria-label="GitHub Repository"
                >
                  <Github size={18} />
                </a>
              )}
              {project.liveLink && (
                <a 
                  href={project.liveLink}
                  className="p-2 rounded-full bg-white/10 hover:bg-purple-500/40 text-white backdrop-blur-sm transition-colors border border-white/10 hover:border-purple-400/50"
                  aria-label="Live Demo"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
          
          <p className="font-sans font-light text-sm text-gray-300 mb-6 line-clamp-2 md:line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: "translateZ(40px)" }}>
            {project.techStack.map(tech => (
              <span 
                key={tech} 
                className="font-mono text-[10px] sm:text-xs text-purple-200 uppercase tracking-widest bg-purple-950/60 px-2.5 py-1 rounded-md border border-purple-500/30 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 z-20 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
           <Layers className="text-white/20" size={80} style={{ transform: "translateZ(10px) rotate(-15deg)" }} />
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500 -z-10"></div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent relative z-10 w-full perspective-[1000px]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl text-gray-900 dark:text-white tracking-tight mb-3 uppercase"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 dark:text-zinc-500 font-sans font-light text-sm sm:text-base max-w-lg"
          >
            A collection of my technical builds, showcasing architecture, problem solving, and modern web capabilities.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
        >
          {PROJECTS.map((project, idx) => (
             <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
