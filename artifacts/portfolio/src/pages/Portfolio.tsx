import SpaceRoom from '@/components/canvas/SpaceRoom';
import FloatingSocialOrbs from '@/components/canvas/FloatingSocialOrbs';
import Navigation from '@/components/ui/Navigation';
import ZoomSection from '@/components/ui/ZoomSection';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Socials from '@/components/sections/Socials';
import Contact from '@/components/sections/Contact';
import Game from '@/components/sections/Game';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-transparent text-foreground relative selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <SpaceRoom />
      <FloatingSocialOrbs />
      <Navigation />

      <main>
        <Hero />
        <ZoomSection><About /></ZoomSection>
        <ZoomSection><Projects /></ZoomSection>
        <ZoomSection><Skills /></ZoomSection>
        <ZoomSection><Game /></ZoomSection>
        <ZoomSection><Socials /></ZoomSection>
        <ZoomSection><Contact /></ZoomSection>
      </main>

      <footer className="py-8 text-center border-t border-border/50 bg-background/60 backdrop-blur-xl relative z-20">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} MANISH SVAVEG
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-primary/70">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            SYSTEM INITIALIZED AND OPERATIONAL
          </div>
        </div>
      </footer>
    </div>
  );
}
