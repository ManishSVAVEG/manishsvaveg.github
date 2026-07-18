import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-28 sm:py-32 px-4 sm:px-6 min-h-screen flex items-center relative overflow-hidden">

      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/4 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-secondary/3 rounded-full blur-[130px] pointer-events-none" />

      {/* Particle dots */}
      <div className="particle-dot w-1.5 h-1.5 bg-primary/30 shadow-[0_0_4px_rgba(0,212,255,0.3)]" style={{ top: '18%', right: '8%', animation: 'particle-float-b 10s ease-in-out infinite 2s' }} />
      <div className="particle-dot w-1 h-1 bg-accent/25 shadow-[0_0_3px_rgba(255,0,110,0.3)]" style={{ bottom: '22%', right: '15%', animation: 'particle-float-c 14s ease-in-out infinite' }} />

      <div className="max-w-4xl mx-auto w-full relative z-10">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 sm:mb-16"
        >
          <div className="eyebrow mb-3">// 02 — SYSTEM_PROFILE</div>
          <div className="flex items-center gap-4 mb-3">
            <span className="text-secondary font-mono text-xl opacity-70">&gt;</span>
            <h2
              className="text-3xl md:text-6xl font-display font-bold text-primary glitch"
              data-text="ABOUT.EXE"
            >
              ABOUT.EXE
            </h2>
          </div>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-primary via-secondary to-transparent opacity-60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative bg-card/40 backdrop-blur-xl border border-primary/30 rounded-lg neon-box-strong group hover:border-primary/55 transition-all duration-500"
        >
          {/* Terminal chrome bar */}
          <div className="terminal-chrome">
            <span className="terminal-dot td-red" />
            <span className="terminal-dot td-yellow" />
            <span className="terminal-dot td-green" />
            <span className="font-mono text-[10px] text-muted-foreground/50 ml-2 tracking-widest">about.exe — bash</span>
            <div className="flex-1" />
            <span className="font-mono text-[9px] text-primary/30 tracking-widest">PID: 1337</span>
          </div>

          {/* Decorative corners — expand on hover */}
          <div className="absolute top-[44px] left-0 w-4 h-4 border-t-2 border-l-2 border-primary transition-all duration-300 group-hover:w-7 group-hover:h-7" />
          <div className="absolute top-[44px] right-0 w-4 h-4 border-t-2 border-r-2 border-primary transition-all duration-300 group-hover:w-7 group-hover:h-7" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary transition-all duration-300 group-hover:w-7 group-hover:h-7" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary transition-all duration-300 group-hover:w-7 group-hover:h-7" />

          {/* Scanlines */}
          <div className="scanlines absolute inset-0 pointer-events-none rounded-none" />

          {/* Content */}
          <div className="p-6 sm:p-8 md:p-12 relative z-10">
            <div className="flex flex-col gap-6 font-mono text-sm sm:text-base text-card-foreground leading-relaxed">

              {/* Meta info */}
              <div className="space-y-2.5">
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="text-accent min-w-[90px] sm:min-w-24">User:</span>
                  <span className="text-white font-bold tracking-wider">Manish Svaveg</span>
                </p>
                <p className="flex items-center gap-3 flex-wrap">
                  <span className="text-accent min-w-[90px] sm:min-w-24">Location:</span>
                  <span className="text-muted-foreground">Delhi, IN</span>
                </p>
                <p className="flex items-start gap-3 flex-wrap">
                  <span className="text-accent min-w-[90px] sm:min-w-24">Status:</span>
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)] flex-shrink-0 animate-pulse" />
                    15-year-old developer &amp; founder of <span className="text-primary font-bold">LearnovaX</span>.
                  </span>
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-primary/30 via-secondary/20 to-transparent" />

              <p className="text-muted-foreground text-sm sm:text-base">
                I build AI-powered applications, tools, and platforms. Hackathon enthusiast. Currently preparing for IIT while scaling my projects. I leverage{' '}
                <span className="text-white font-semibold">AI-assisted development</span> to move faster and build more ambitious ideas than most consider possible at my age.
              </p>

              {/* Quote */}
              <div className="relative pl-5 py-3 border-l-2 border-secondary bg-secondary/5 pr-4 rounded-r">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <p className="text-muted-foreground italic text-sm sm:text-base">
                  "Code is just the tool. The goal is to build the future."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
