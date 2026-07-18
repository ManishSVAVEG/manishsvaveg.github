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
    color: "primary"
  },
  {
    title: "SVAVEG Suite",
    desc: "Personal developer toolkit suite to accelerate workflow and automate repetitive tasks across various projects.",
    tags: ["CLI", "TypeScript", "Automation"],
    link: "#",
    github: "#",
    color: "secondary"
  },
  {
    title: "Terminal.AI",
    desc: "A futuristic command-line interface supercharged with large language models to assist developers natively.",
    tags: ["Python", "OpenAI", "Rust"],
    link: "#",
    github: "#",
    color: "accent"
  }
];

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
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };
  
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const glowColor = project.color === 'primary' ? 'rgba(0,212,255,0.3)' : project.color === 'secondary' ? 'rgba(139,92,246,0.3)' : 'rgba(255,0,110,0.3)';
  const borderColor = project.color === 'primary' ? 'border-primary' : project.color === 'secondary' ? 'border-secondary' : 'border-accent';
  const textColor = project.color === 'primary' ? 'text-primary' : project.color === 'secondary' ? 'text-secondary' : 'text-accent';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[4/3] rounded-xl cursor-crosshair group z-10"
    >
      <div 
        className={`absolute inset-0 bg-card/60 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden transition-all duration-500 group-hover:${borderColor}`}
        style={{ transform: "translateZ(0px)", boxShadow: `0 0 0 ${glowColor}` }}
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
          style={{ background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-20 mix-blend-overlay z-0" />
        
        <div className="p-6 md:p-8 h-full flex flex-col justify-between relative z-10" style={{ transform: "translateZ(50px)" }}>
          <div>
            <div className={`text-xs font-mono mb-2 opacity-70 ${textColor}`}>// STATUS: ACTIVE</div>
            <h3 className={`text-3xl font-display font-black text-foreground group-hover:${textColor} transition-colors duration-300 tracking-wide`}>
              {project.title}
            </h3>
            <p className="mt-4 text-muted-foreground font-mono text-sm leading-relaxed">{project.desc}</p>
          </div>
          
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className={`font-mono text-[10px] px-3 py-1 border border-border/50 ${textColor} bg-background/30 tracking-widest`}>
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              <a href={project.github} className={`flex items-center gap-2 font-mono text-xs ${textColor} hover:opacity-70 transition-opacity`}>
                <Github size={14} /> SOURCE
              </a>
              <a href={project.link} className={`flex items-center gap-2 font-mono text-xs ${textColor} hover:opacity-70 transition-opacity`}>
                <ExternalLink size={14} /> LIVE
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
    <section id="projects" className="py-32 px-6 min-h-screen relative flex items-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-6xl font-display font-bold text-primary glitch" data-text="PROJECTS.SYS">
            PROJECTS.SYS
          </h2>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-primary to-transparent mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
