import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Roadmap from './components/Roadmap';
import Projects from './components/Projects';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ParticleBackground from './components/ParticleBackground';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-white text-gray-900 dark:bg-[#050505] dark:text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-purple-200 dark:selection:bg-purple-950 selection:text-purple-900 dark:selection:text-purple-200 transition-colors duration-300">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Roadmap />
          <Hobbies />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}
