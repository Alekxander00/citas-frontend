import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, radius: 80 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuración del canvas
    canvas.width = width;
    canvas.height = height;

    // Clase para partículas normales
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() * 1 - 0.5) * 0.3; // Movimiento más lento
        this.speedY = (Math.random() * 1 - 0.5) * 0.3;
        this.color = `rgba(100, 180, 255, ${Math.random() * 0.4 + 0.2})`;
        this.depth = Math.random(); // Profundidad para efecto 3D
        this.waveOffset = Math.random() * Math.PI * 2;
      }

      update() {
        // Movimiento natural con ondas suaves
        this.x += this.speedX + Math.sin(Date.now() * 0.001 + this.waveOffset) * 0.1;
        this.y += this.speedY + Math.cos(Date.now() * 0.001 + this.waveOffset) * 0.1;

        // Rebote suave en los bordes
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        // Interacción muy suave con el mouse
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          
          // Movimiento más suave alejándose del mouse
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }

      draw() {
        // Partícula más pequeña según profundidad
        const drawSize = this.size * (0.5 + this.depth * 0.5);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, drawSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Clase para partículas de fondo (estrellas profundas)
    class DeepParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 0.8 + 0.2;
        this.speedX = (Math.random() * 0.4 - 0.2) * 0.1; // Muy lentas
        this.speedY = (Math.random() * 0.4 - 0.2) * 0.1;
        this.color = `rgba(60, 100, 180, ${Math.random() * 0.2 + 0.1})`;
        this.depth = Math.random() * 0.5; // Más en el fondo
        this.twinkleSpeed = Math.random() * 0.01 + 0.005;
        this.twinkleOffset = Math.random() * Math.PI * 2;
      }

      update() {
        // Movimiento muy lento
        this.x += this.speedX;
        this.y += this.speedY;

        // Bucle continuo
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
      }

      draw() {
        // Efecto de brillo intermitente suave
        const alpha = 0.1 + (Math.sin(Date.now() * this.twinkleSpeed + this.twinkleOffset) * 0.1 + 0.1);
        ctx.fillStyle = `rgba(100, 150, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * (1 + this.depth), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Crear partículas normales y de fondo
    const initParticles = () => {
      particlesRef.current = [];
      
      // Partículas normales (más cerca)
      const normalCount = Math.min(Math.floor(width * height / 6000), 200);
      for (let i = 0; i < normalCount; i++) {
        particlesRef.current.push(new Particle());
      }
      
      // Partículas de fondo (estrellas profundas)
      const deepCount = Math.min(Math.floor(width * height / 4000), 300);
      for (let i = 0; i < deepCount; i++) {
        particlesRef.current.push(new DeepParticle());
      }
    };

    // Función para dibujar conexiones entre partículas cercanas
    const drawConnections = () => {
      // Solo buscar conexiones entre partículas normales
      const normalParticles = particlesRef.current.filter(p => p instanceof Particle);
      
      for (let i = 0; i < normalParticles.length; i++) {
        for (let j = i + 1; j < normalParticles.length; j++) {
          const p1 = normalParticles[i];
          const p2 = normalParticles[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Solo conectar si están relativamente cerca y tienen profundidad similar
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

    // Función de animación
    const animate = () => {
      // Fondo azul oscuro con gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0a1128'); // Azul muy oscuro arriba
      gradient.addColorStop(0.5, '#0c1445'); // Azul oscuro medio
      gradient.addColorStop(1, '#081020'); // Azul casi negro abajo
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Dibujar partículas de fondo primero
      particlesRef.current.forEach(particle => {
        if (particle instanceof DeepParticle) {
          particle.update();
          particle.draw();
        }
      });

      // Dibujar conexiones entre partículas normales
      drawConnections();

      // Dibujar partículas normales encima
      particlesRef.current.forEach(particle => {
        if (particle instanceof Particle) {
          particle.update();
          particle.draw();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    // Inicializar
    initParticles();
    animate();

    // Agregar event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;