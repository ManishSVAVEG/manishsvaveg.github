import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "LearnovaX",
    desc: "AI-powered learning platform aimed at revolutionizing education. Built by the founder to make learning limitless.",
    tags: ["AI", "Next.js", "Tailwind"],
    link: "#",
    github: "#",
    color: "primary",
    num: "01",
  },
  {
    title: "SVAVEG Suite",
    desc: "Personal developer toolkit suite to accelerate workflow and automate repetitive tasks across various projects.",
    tags: ["CLI", "TypeScript", "Automation"],
    link: "#",
    github: "#",
    color: "secondary",
    num: "02",
  },
  {
    title: "Terminal.AI",
    desc: "A futuristic command-line interface supercharged with large language models to assist developers natively.",
    tags: ["Python", "OpenAI", "Rust"],
    link: "#",
    github: "#",
    color: "accent",
    num: "03",
  }
];

const colorMap = {
  primary:   { hex: '#00D4FF', border: 'border-primary',   text: 'text-primary',   glow: 'rgba(0,212,255,0.35)',   tagClass: 'skill-tag-primary',   topClass: 'card-top-primary' },
  secondary: { hex: '#8B5CF6', border: 'border-secondary', text: 'text-secondary', glow: 'rgba(139,92,246,0.35)', tagClass: 'skill-tag-secondary', topClass: 'card-top-secondary' },
  accent:    { hex: '#FF006E', border: 'border-accent',    text: 'text-accent',    glow: 'rgba(255,0,110,0.35)',   tagClass: 'skill-tag-accent',    topClass: 'card-top-accent' },
} as const;

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const c = colorMap[project.color as keyof typeof colorMap];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[4/3] cursor-crosshair group z-10"
    >
      <div
        className={`absolute inset-0 bg-card/60 backdrop-blur-md border border-border/40 overflow-hidden transition-all duration-500 group-hover:${c.border} group-hover:shadow-[0_0_40px_${c.glow}] ${c.topClass} relative`}
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Hover radial glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
          style={{ background: `radial-gradient(circle at 50% 50%, ${c.glow.replace('0.35', '0.18')} 0%, transparent 70%)` }}
        />

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-20 mix-blend-overlay z-0" />

        <div className="p-5 md:p-7 h-full flex flex-col justify-between relative z-10" style={{ transform: "translateZ(40px)" }}>
          <div>
            {/* Top meta row */}
            <div className="flex items-center justify-between mb-3">
              <span className={`font-mono text-[9px] tracking-[0.25em] ${c.text} opacity-60 uppercase`}>
                // STATUS: ACTIVE
              </span>
              <span className={`font-mono text-[9px] ${c.text} opacity-40 tracking-widest`}>
                {project.num}
              </span>
            </div>

            {/* Thin accent line under meta */}
            <div className="h-px mb-4" style={{ background: `linear-gradient(90deg, ${c.hex}44, transparent)` }} />

            <h3 className={`text-2xl sm:text-3xl font-display font-black text-foreground group-hover:${c.text} transition-colors duration-300 tracking-wide leading-tight`}>
              {project.title}
            </h3>
            <p className="mt-3 text-muted-foreground font-mono text-xs sm:text-sm leading-relaxed line-clamp-3">
              {project.desc}
            </p>
          </div>

          <div>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className={`font-mono text-[9px] px-2.5 py-1 border tracking-widest uppercase transition-all duration-300 cursor-default ${c.tagClass}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-5">
              <a href={project.github} className={`flex items-center gap-1.5 font-mono text-[10px] ${c.text} opacity-60 hover:opacity-100 transition-opacity tracking-widest uppercase`}>
                <Github size={12} /> Source
              </a>
              <a href={project.link} className={`flex items-center gap-1.5 font-mono text-[10px] ${c.text} opacity-60 hover:opacity-100 transition-opacity tracking-widest uppercase`}>
                <ExternalLink size={12} /> Live
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 sm:py-32 px-4 sm:px-6 min-h-screen relative flex items-center overflow-hidden">

      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/3 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Particle dots */}
      <div className="particle-dot w-1.5 h-1.5 bg-secondary/35 shadow-[0_0_4px_rgba(139,92,246,0.3)]" style={{ top: '20%', right: '8%', animation: 'particle-float-b 10s ease-in-out infinite' }} />
      <div className="particle-dot w-1 h-1 bg-primary/30 shadow-[0_0_3px_rgba(0,212,255,0.3)]" style={{ bottom: '25%', left: '5%', animation: 'particle-float-a 13s ease-in-out infinite 3s' }} />

      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20 flex flex-col items-center gap-3"
        >
          <div className="eyebrow">// 03 — SYSTEM_MODULES</div>
          <h2
            className="text-3xl md:text-6xl font-display font-bold text-primary glitch"
            data-text="PROJECTS.SYS"
          >
            PROJECTS.SYS
          </h2>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-primary to-transparent mt-1 opacity-60" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" style={{ perspective: "1200px" }}>
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
