import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SocialCube from '@/components/canvas/SocialCube';

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => { setDisplayed(text.substring(0, i)); i++; if (i > text.length) clearInterval(id); }, 50);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className="inline-block relative">
      {displayed}
      <span className="animate-pulse inline-block w-2 h-5 bg-primary ml-1 align-middle shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
    </span>
  );
};

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 relative overflow-hidden">

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Radial ambient glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating particle dots */}
      <div className="particle-dot w-1.5 h-1.5 bg-primary/40 shadow-[0_0_4px_rgba(0,212,255,0.4)]" style={{ top: '22%', left: '15%', animation: 'particle-float-a 8s ease-in-out infinite' }} />
      <div className="particle-dot w-1 h-1 bg-secondary/40 shadow-[0_0_3px_rgba(139,92,246,0.4)]" style={{ top: '65%', left: '10%', animation: 'particle-float-b 11s ease-in-out infinite 2s' }} />
      <div className="particle-dot w-1.5 h-1.5 bg-accent/35 shadow-[0_0_4px_rgba(255,0,110,0.4)]" style={{ top: '30%', right: '12%', animation: 'particle-float-c 9s ease-in-out infinite 1s' }} />
      <div className="particle-dot w-1 h-1 bg-primary/30 shadow-[0_0_3px_rgba(0,212,255,0.3)]" style={{ top: '70%', right: '18%', animation: 'particle-float-a 13s ease-in-out infinite 4s' }} />

      {/* Main layout */}
      <div className="max-w-6xl w-full mx-auto z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">

        {/* Social Cube */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <SocialCube />
        </motion.div>

        {/* Text content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="eyebrow mb-4"
          >
            <span className="text-primary/50">// SYSTEM_BOOT — v2.0.25</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display tracking-tighter leading-none">
              <span
                className="glitch text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                data-text="MANISH"
              >MANISH</span>
              <br />
              <span
                className="glitch glitch-gradient drop-shadow-[0_2px_30px_rgba(0,212,255,0.35)]"
                data-text="SVAVEG"
              >SVAVEG</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-5 text-sm sm:text-base md:text-lg text-muted-foreground font-mono h-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <TypewriterText text="Building AI-powered apps & futuristic ideas" />
          </motion.p>

          {/* Badges */}
          <motion.div
            className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            {[
              { label: '15yo Developer', color: 'border-primary/40 bg-primary/8 text-primary/80' },
              { label: 'Delhi 🇮🇳',       color: 'border-secondary/40 bg-secondary/8 text-secondary/80' },
              { label: 'LearnovaX Founder', color: 'border-accent/40 bg-accent/8 text-accent/80' },
              { label: 'IIT Aspirant',   color: 'border-primary/30 bg-primary/5 text-primary/60' },
            ].map(b => (
              <span
                key={b.label}
                className={`font-mono text-[10px] px-3 py-1.5 border ${b.color} tracking-widest uppercase flex items-center gap-1.5 transition-all duration-300 hover:brightness-125`}
              >
                <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                {b.label}
              </span>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            className="mt-8 w-48 lg:w-64 divider-gradient-h"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          />

          {/* CTAs */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <a
              href="#projects"
              className="btn-shimmer cta-full-mobile group relative inline-flex items-center justify-center px-7 py-3 font-display font-bold text-sm text-primary border border-primary bg-primary/10 hover:bg-primary/20 transition-all duration-300 uppercase tracking-widest neon-box hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
            >
              <span className="relative flex items-center gap-2">
                View Projects
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </span>
            </a>
            <a
              href="#game"
              className="btn-shimmer cta-full-mobile inline-flex items-center justify-center px-7 py-3 font-display font-bold text-sm text-secondary border border-secondary bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 uppercase tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]"
            >
              Play Game
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
      >
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent" />
        <div className="w-1 h-1 rounded-full bg-primary/40 animate-bounce" />
      </motion.div>
    </section>
  );
}
