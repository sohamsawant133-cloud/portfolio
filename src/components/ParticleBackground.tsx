import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Mouse Interaction for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      angle: number;
      distance: number;
      yOffset: number;
      size: number;
      speed: number;
      hue: number;
      opacityMultiplier: number;

      constructor() {
        // 2 distinct arms like the reference image
        const arms = 2;
        const armOffset = Math.floor(Math.random() * arms) * ((Math.PI * 2) / arms);
        
        // Distribution: dense center, spread out edge
        this.distance = Math.pow(Math.random(), 2) * (canvas!.width > 800 ? 900 : 500);
        
        // Form the spiral shape curve
        const spiralFactor = 0.007;
        const randomSpread = (Math.random() - 0.5) * (this.distance < 150 ? 1.5 : 0.5);
        this.angle = armOffset + this.distance * spiralFactor + randomSpread;
        
        // Core bulge (very flat disk like image)
        const bulge = Math.exp(-this.distance / 50) * 15;
        this.yOffset = (Math.random() - 0.5) * (bulge + 1.5);
        
        // Particle size varied
        this.size = Math.random() * 1.5 + 0.2;
        
        // Orbital speed
        this.speed = 0.3 / (this.distance + 30);
        
        // Colors: Inner is Pink/Magenta (320), Outer is Blue (220)
        // Lerp hue based on distance
        this.hue = 320 - (this.distance / 800) * 100 + (Math.random() * 20 - 10);
        this.opacityMultiplier = Math.random() * 0.5 + 0.5;
      }

      update() {
        this.angle -= this.speed * 0.6; // Smooth rotation
      }

      draw() {
        if (!ctx || !canvas) return;
        
        // Interactive 3D Tilt based on mouse
        const baseTilt = 1.35; // Flatter tilt
        const mouseTiltX = mouseY * 0.1; // Vertical mouse moves plane tilt
        const tilt = baseTilt + mouseTiltX;
        
        const mousePanX = mouseX * 100; // Horizontal mouse shifts galaxy

        // Base 3D coordinates
        const xPos = Math.cos(this.angle) * this.distance + mousePanX;
        const zPos = Math.sin(this.angle) * this.distance;
        
        // Apply tilt rotation around X-axis
        const yRot = this.yOffset * Math.cos(tilt) - zPos * Math.sin(tilt);
        const zRot = this.yOffset * Math.sin(tilt) + zPos * Math.cos(tilt);
        
        // Perspective projection
        const focalLength = 500;
        const zOffset = 600; // Distance from camera
        const scale = focalLength / (focalLength + zRot + zOffset);
        
        if (scale < 0) return; // Behind camera
        
        const screenX = canvas.width / 2 + xPos * scale;
        // Offset Y slightly downward to match image framing
        const screenY = canvas.height / 2 + yRot * scale + mouseY * 50 + 50;
        
        const screenRadius = Math.max(0.1, this.size * scale);
        
        // Optimization: don't draw if outside screen
        if (screenX < -50 || screenX > canvas.width + 50 || screenY < -50 || screenY > canvas.height + 50) return;

        ctx.beginPath();
        ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
        
        const isDark = document.documentElement.classList.contains('dark');
        const intensity = isDark ? 1 : 0.8;
        
        const distanceAlpha = Math.max(0, 1 - this.distance / 1200);
        const alpha = Math.min(1, intensity * scale * distanceAlpha * this.opacityMultiplier * 2);
        
        // Center goes white-hot magenta
        const lightness = this.distance < 100 ? 85 : 65;
        
        ctx.fillStyle = `hsla(${this.hue}, 90%, ${lightness}%, ${alpha})`;
        ctx.fill();
        
        // Bloom/Glow for larger/brighter stars
        if (this.size > 1.2 && this.distance > 80 && Math.random() > 0.8) {
           const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, screenRadius * 3);
           gradient.addColorStop(0, `hsla(${this.hue}, 90%, 80%, ${alpha * 0.4})`);
           gradient.addColorStop(1, `hsla(${this.hue}, 90%, 80%, 0)`);
           ctx.fillStyle = gradient;
           ctx.arc(screenX, screenY, screenRadius * 3, 0, Math.PI * 2);
           ctx.fill();
        }
        
        ctx.closePath();
      }
    }

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas!.width * canvas!.height) / 700); 
      for (let i = 0; i < Math.min(numParticles, 4000); i++) {
        particles.push(new Particle());
      }
    };

    const drawCoreGlow = () => {
      // Lerp mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const centerX = canvas!.width / 2 + mouseX * 100;
      const centerY = canvas!.height / 2 + mouseY * 50 + 50;

      const baseTilt = 1.35;
      const tilt = baseTilt + mouseY * 0.1;

      // Draw an elliptical glow for the galactic core
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Flatten the glow to match the tilt
      ctx.scale(1, Math.cos(tilt));
      
      const gradient = ctx.createRadialGradient(0, 0, 5, 0, 0, 180);
      const isDark = document.documentElement.classList.contains('dark');
      
      // Pink/Magenta core glow
      gradient.addColorStop(0, isDark ? 'rgba(255, 180, 230, 0.4)' : 'rgba(255, 150, 220, 0.3)');
      gradient.addColorStop(0.2, isDark ? 'rgba(220, 100, 200, 0.15)' : 'rgba(200, 80, 180, 0.1)');
      gradient.addColorStop(0.5, isDark ? 'rgba(120, 50, 255, 0.05)' : 'rgba(100, 40, 255, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, 180, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      
      // Draw background glow for the galactic core
      drawCoreGlow();

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
        style={{ opacity: 0.9 }}
      />
    </>
  );
}
