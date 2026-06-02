import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hi! I am the AI assistant for this portfolio. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: 'ai', text: data.reply || data.error || 'Connection error.' },
      ]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'ai', text: 'Failed to connect to AI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[450px] bg-white dark:bg-[#0F0F0F] rounded-2xl border border-gray-200 dark:border-purple-900/40 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-purple-600 dark:bg-purple-900/60 border-b border-gray-100 dark:border-purple-900/40 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-display font-medium text-sm">Portfolio Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-purple-200 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#050505]/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-xl p-3 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-sm'
                        : 'bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-300 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-300 rounded-xl p-3 rounded-bl-sm">
                    <Loader2 size={16} className="animate-spin text-purple-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 dark:border-purple-900/30 bg-white dark:bg-[#0F0F0F] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Soham..."
                className="flex-1 bg-gray-100 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-white focus:outline-none focus:border-purple-500 transition-colors"
                autoFocus
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl flex items-center justify-center 
                   hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-shadow duration-300 relative"
      >
         <Bot size={28} />
      </motion.button>
    </div>
  );
}
