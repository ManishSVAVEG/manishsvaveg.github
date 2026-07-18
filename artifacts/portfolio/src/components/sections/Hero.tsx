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
      {/* Main layout: cube left, text right on desktop; stacked on mobile */}
      <div className="max-w-6xl w-full mx-auto z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">

        {/* ── Social Cube ── */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex-shrink-0"
        >
          <SocialCube />
        </motion.div>

        {/* ── Text content ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Glitch name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-display tracking-tighter leading-none">
              <span className="glitch text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]" data-text="MANISH">MANISH</span>
              <br />
              <span className="glitch text-primary drop-shadow-[0_0_20px_rgba(0,212,255,0.6)]" data-text="SVAVEG">SVAVEG</span>
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
            {['15yo Developer', 'Delhi 🇮🇳', 'LearnovaX Founder', 'IIT Aspirant'].map(b => (
              <span key={b} className="font-mono text-[10px] px-3 py-1 border border-primary/30 bg-primary/5 text-primary/70 tracking-widest uppercase">
                {b}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <a href="#projects" className="group relative inline-flex items-center justify-center px-7 py-3 font-display font-bold text-sm text-primary border border-primary bg-primary/10 hover:bg-primary/20 transition-all duration-300 uppercase tracking-widest neon-box">
              <span className="absolute inset-0 w-0 group-hover:w-full transition-all duration-500 bg-primary/10" />
              <span className="relative">View Projects →</span>
            </a>
            <a href="#game" className="inline-flex items-center justify-center px-7 py-3 font-display font-bold text-sm text-secondary border border-secondary bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 uppercase tracking-widest shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]">
              Play Game
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
