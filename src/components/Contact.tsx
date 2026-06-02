import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  const socials = [
    {
      name: 'LinkedIn',
      href: '#',
      icon: <Linkedin size={18} />,
      tag: 'soham-sawant',
      color: 'hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500/30'
    },
    {
      name: 'GitHub',
      href: '#',
      icon: <Github size={18} />,
      tag: 'SohamSawant',
      color: 'hover:text-gray-900 dark:hover:text-white hover:border-gray-900/30 dark:hover:border-white/30'
    },
    {
      name: 'Email',
      href: 'mailto:sohamsawant133@gmail.com',
      icon: <Mail size={18} />,
      tag: 'sohamsawant133@gmail.com',
      color: 'hover:text-purple-600 dark:hover:text-purple-300 hover:border-purple-500/30'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.05),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-4xl text-gray-900 dark:text-white tracking-tight mb-3 uppercase"
          >
            Let's Connect
          </motion.h2>
          <div className="w-16 h-[3px] bg-purple-500 mb-6 font-bold"></div>
          <p className="text-gray-600 dark:text-zinc-500 font-sans font-light text-sm sm:text-base max-w-lg">
            Have a project or opportunity? Send a message and let's work on creating something incredible together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start perspective-[1200px]">
          
          {/* Left panel: Direct connects */}
          <div className="lg:col-span-5 space-y-6 transform-gpu">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-4 uppercase">
              Contact Channels
            </h3>
            <p className="font-sans font-light text-sm text-gray-600 dark:text-zinc-400 leading-relaxed max-w-sm mb-6">
              Feel free to reach out via these networks. I will do my absolute best to respond to emails and messages within 24 hours.
            </p>

            <div className="space-y-4">
              {socials.map((platform, idx) => (
                <motion.a
                  key={platform.name}
                  href={platform.href}
                  initial={{ opacity: 0, x: -20, rotateY: 10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-purple-900/30 transition-all duration-300 group shadow-md dark:shadow-none ${platform.color}`}
                >
                  <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-gray-200 dark:border-purple-900/30 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                    {platform.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-xs text-gray-500 dark:text-zinc-500 uppercase tracking-widest">{platform.name}</h4>
                    <p className="font-sans text-sm text-gray-800 dark:text-zinc-300 font-light mt-0.5">{platform.tag}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right panel: Modern form layout */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20, rotateY: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#0F0F0F] border border-gray-200 dark:border-purple-900/30 shadow-xl dark:shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
            >
              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1 flex items-center gap-2 uppercase">
                <MessageSquare size={18} className="text-purple-600 dark:text-purple-400" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="font-sans font-light text-xs text-gray-500 dark:text-zinc-500 mb-8">
                Your message is sent securely and directly to Soham.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div>
                  <label htmlFor="name" className="block font-mono text-[10px] text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans text-sm text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                    placeholder="Soham Sagar"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans text-sm text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                    placeholder="soham@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans text-sm text-gray-900 dark:text-white transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-600 resize-none"
                    placeholder="Hi Soham, I'd love to chat about..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all duration-300 hover:shadow-[0_4px_25px_rgba(168,85,247,0.45)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={14} />
                    </>
                  )}
                </motion.button>
              </form>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center z-20 border border-gray-200 dark:border-purple-500/20"
                  >
                    <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center mb-4 shadow-lg lg:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <CheckCircle2 size={28} />
                    </div>
                    <h4 className="font-display font-medium text-lg text-gray-900 dark:text-white mb-2">Message Sent Successfully!</h4>
                    <p className="font-sans font-light text-xs text-gray-600 dark:text-zinc-400 max-w-sm leading-relaxed mb-6">
                      Thank you for reaching out. Soham will check your message and be in contact with you as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2 rounded-lg bg-gray-100 dark:bg-purple-900/30 border border-gray-200 dark:border-purple-500/30 text-gray-700 dark:text-purple-200 hover:text-gray-900 dark:hover:text-white text-xs font-semibold hover:bg-gray-200 dark:hover:bg-purple-950 transition-colors"
                    >
                      Close Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
