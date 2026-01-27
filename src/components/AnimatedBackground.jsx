import React, { useEffect, useRef, useState } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 80 });
  const animationRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuración del canvas
    canvas.width = width;
    canvas.height = height;

    // Optimizar para rendimiento en móviles
    const particleCount = isMobile ? 
      Math.min(Math.floor(width * height / 10000), 80) : 
      Math.min(Math.floor(width * height / 8000), 150);

    // Clase para partículas
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = isMobile ? (Math.random() * 1.5 + 0.5) : (Math.random() * 2 + 0.5);
        this.speedX = (Math.random() * 1 - 0.5) * (isMobile ? 0.2 : 0.3);
        this.speedY = (Math.random() * 1 - 0.5) * (isMobile ? 0.2 : 0.3);
        this.color = `rgba(100, 180, 255, ${Math.random() * 0.4 + 0.2})`;
        this.depth = Math.random();
        this.waveOffset = Math.random() * Math.PI * 2;
      }

      update() {
        // Movimiento optimizado para móviles
        const waveIntensity = isMobile ? 0.05 : 0.1;
        this.x += this.speedX + Math.sin(Date.now() * 0.001 + this.waveOffset) * waveIntensity;
        this.y += this.speedY + Math.cos(Date.now() * 0.001 + this.waveOffset) * waveIntensity;

        // Rebote suave
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        // Interacción con mouse (deshabilitada en móviles táctiles)
        if (!isMobile) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            
            this.x -= Math.cos(angle) * force * 2;
            this.y -= Math.sin(angle) * force * 2;
          }
        }
      }

      draw() {
        const drawSize = this.size * (0.5 + this.depth * 0.5);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, drawSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Inicializar partículas
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };

    // Dibujar conexiones (solo en desktop)
    const drawConnections = () => {
      if (isMobile) return; // No dibujar conexiones en móviles para mejor rendimiento
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120 && Math.abs(p1.depth - p2.depth) < 0.3) {
            const alpha = (1 - distance / 120) * 0.2;
            ctx.strokeStyle = `rgba(100, 180, 255, ${alpha})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Función de animación optimizada
    const animate = () => {
      // Fondo fijo para mejor rendimiento
      ctx.fillStyle = '#0a1128';
      ctx.fillRect(0, 0, width, height);

      // Actualizar y dibujar partículas
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Dibujar conexiones solo si no es móvil
      if (!isMobile) {
        drawConnections();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleMouseMove = (e) => {
      if (!isMobile) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      checkMobile();
      initParticles();
    };

    const handleTouchMove = (e) => {
      if (isMobile && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      }
    };

    // Inicializar
    initParticles();
    animate();

    // Agregar event listeners
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;