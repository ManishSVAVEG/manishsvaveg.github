import { motion } from 'framer-motion';
import { Cpu, Sparkles, Smartphone } from 'lucide-react';

const skillCategories = [
  {
    title: "Mobile Dev",
    icon: <Smartphone size={26} className="text-primary" />,
    colorType: "primary",
    tagClass: "skill-tag-primary",
    borderHex: "#00D4FF",
    skills: ["Android", "Kotlin", "Jetpack Compose", "MVVM", "React Native", "Expo", "EAS"]
  },
  {
    title: "AI & Workflows",
    icon: <Cpu size={26} className="text-secondary" />,
    colorType: "secondary",
    tagClass: "skill-tag-secondary",
    borderHex: "#8B5CF6",
    skills: ["AI-Assisted Dev", "LLM Integration", "Repo Polish", "Technical Docs", "Automation"]
  },
  {
    title: "Creative",
    icon: <Sparkles size={26} className="text-accent" />,
    colorType: "accent",
    tagClass: "skill-tag-accent",
    borderHex: "#FF006E",
    skills: ["Demo Videos", "Creative Remixing", "UI/UX", "3D Web", "Python"]
  }
];

const getColorStyles = (type: string) => {
  if (type === 'primary') return {
    border: 'border-primary',
    glow: 'shadow-[0_0_20px_rgba(0,212,255,0.25)]',
    blob: 'bg-primary/15 group-hover:bg-primary/35',
    iconBox: 'border-primary/40 bg-primary/8 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.4)]',
    leftBar: 'bg-gradient-to-b from-primary to-transparent',
  };
  if (type === 'secondary') return {
    border: 'border-secondary',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.25)]',
    blob: 'bg-secondary/15 group-hover:bg-secondary/35',
    iconBox: 'border-secondary/40 bg-secondary/8 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]',
    leftBar: 'bg-gradient-to-b from-secondary to-transparent',
  };
  return {
    border: 'border-accent',
    glow: 'shadow-[0_0_20px_rgba(255,0,110,0.25)]',
    blob: 'bg-accent/15 group-hover:bg-accent/35',
    iconBox: 'border-accent/40 bg-accent/8 group-hover:shadow-[0_0_15px_rgba(255,0,110,0.4)]',
    leftBar: 'bg-gradient-to-b from-accent to-transparent',
  };
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 sm:py-32 px-4 sm:px-6 min-h-screen relative flex items-center overflow-hidden">

      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none" />

      {/* Particle dots */}
      <div className="particle-dot w-1.5 h-1.5 bg-accent/60 shadow-[0_0_8px_rgba(255,0,110,0.8)]" style={{ top: '15%', right: '6%', animation: 'particle-float-c 9s ease-in-out infinite 1s' }} />
      <div className="particle-dot w-1 h-1 bg-secondary/60 shadow-[0_0_6px_rgba(139,92,246,0.8)]" style={{ bottom: '20%', right: '12%', animation: 'particle-float-a 12s ease-in-out infinite 5s' }} />

      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20 flex flex-col items-end gap-3"
        >
          <div className="eyebrow">04 — CORE_MODULES //</div>
          <div className="flex items-center gap-4">
            <h2
              className="text-3xl md:text-6xl font-display font-bold text-primary glitch"
              data-text="SKILLS.DAT"
            >
              SKILLS.DAT
            </h2>
            <span className="text-secondary font-mono text-xl opacity-70">&lt;</span>
          </div>
          <div className="h-px w-full max-w-sm bg-gradient-to-l from-primary via-secondary to-transparent opacity-60" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8">
          {skillCategories.map((category, idx) => {
            const styles = getColorStyles(category.colorType);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`bg-card/40 backdrop-blur-xl border border-border/60 relative overflow-hidden group transition-all duration-500 hover:${styles.border} hover:${styles.glow}`}
              >
                {/* Colored left accent bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${styles.leftBar} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Animated background glow blob */}
                <div className={`absolute -top-20 -right-20 w-44 h-44 ${styles.blob} rounded-full blur-[60px] transition-colors duration-500 pointer-events-none`} />

                {/* Card content */}
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className={`p-3.5 bg-background border transition-all duration-500 ${styles.iconBox}`}>
                      {category.icon}
                    </div>
                    <div>
                      <div className="eyebrow text-[8px] mb-0.5 opacity-60">{String(idx + 1).padStart(2, '0')}</div>
                      <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wider">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (idx * 0.2) + (i * 0.05) }}
                        className={`font-mono text-xs px-3 py-1.5 border transition-all duration-300 cursor-default tracking-wide ${category.tagClass}`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
