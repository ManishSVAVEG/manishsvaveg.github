import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoPath from '@assets/Copilot_20260718_093228_1784351878407.png';

const links = [
  { name: 'HOME',     href: '#hero'     },
  { name: 'ABOUT',   href: '#about'    },
  { name: 'PROJECTS',href: '#projects' },
  { name: 'SKILLS',  href: '#skills'   },
  { name: 'GAME',    href: '#game'     },
  { name: 'CONTACT', href: '#contact'  },
];

export default function Navigation() {
  const [active, setActive]   = useState('HOME');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const mid = window.scrollY + window.innerHeight / 2;
      links.forEach(l => {
        const el = document.getElementById(l.href.slice(1));
        if (el && el.offsetTop <= mid && el.offsetTop + el.offsetHeight > mid)
          setActive(l.name);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navLink = (link: typeof links[0], onClick?: () => void) => (
    <a
      key={link.name}
      href={link.href}
      onClick={onClick}
      className={`text-xs font-mono tracking-widest transition-all duration-300 relative
        ${active === link.name ? 'text-primary neon-text-primary' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {link.name}
      {active === link.name && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_5px_rgba(0,212,255,0.8)]" />
      )}
    </a>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
            <img
              src={logoPath}
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-[0_0_10px_rgba(0,212,255,0.8)] transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-display font-bold text-lg sm:text-xl tracking-widest text-foreground group-hover:text-primary transition-colors duration-300">
              M.S
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 bg-card/50 backdrop-blur-lg px-5 lg:px-6 py-3 border border-border/50 rounded-full">
            {links.map(l => navLink(l))}
          </div>

          {/* Desktop CTA */}
          <a href="#contact" className="hidden md:flex items-center gap-2 px-5 py-2 text-xs font-mono text-primary border border-primary/50 hover:bg-primary/10 transition-colors bg-background/50 backdrop-blur-sm">
            <span>init</span>
            <span className="w-2 h-2 bg-primary animate-pulse" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-50"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-primary"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-primary origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map(l => (
              <a
                key={l.name}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-display font-bold tracking-widest transition-colors duration-300
                  ${active === l.name ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {l.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
