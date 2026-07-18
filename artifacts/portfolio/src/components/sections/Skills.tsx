import { motion } from 'framer-motion';
import { Cpu, Sparkles, Smartphone } from 'lucide-react';

const skillCategories = [
  {
    title: "Mobile Dev",
    icon: <Smartphone size={28} className="text-primary" />,
    colorType: "primary",
    skills: ["Android", "Kotlin", "Jetpack Compose", "MVVM", "React Native", "Expo", "EAS"]
  },
  {
    title: "AI & Workflows",
    icon: <Cpu size={28} className="text-secondary" />,
    colorType: "secondary",
    skills: ["AI-Assisted Dev", "LLM Integration", "Repo Polish", "Technical Docs", "Automation"]
  },
  {
    title: "Creative",
    icon: <Sparkles size={28} className="text-accent" />,
    colorType: "accent",
    skills: ["Demo Videos", "Creative Remixing", "UI/UX", "3D Web", "Python"]
  }
];

const getColorStyles = (type: string) => {
  if (type === 'primary') return {
    border: 'border-primary',
    glow: 'shadow-[0_0_15px_rgba(0,212,255,0.3)]',
    blob: 'bg-primary/20 group-hover:bg-primary/40'
  };
  if (type === 'secondary') return {
    border: 'border-secondary',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.3)]',
    blob: 'bg-secondary/20 group-hover:bg-secondary/40'
  };
  return {
    border: 'border-accent',
    glow: 'shadow-[0_0_15px_rgba(255,0,110,0.3)]',
    blob: 'bg-accent/20 group-hover:bg-accent/40'
  };
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 min-h-screen relative flex items-center overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col items-end"
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl md:text-6xl font-display font-bold text-primary glitch" data-text="SKILLS.DAT">
              SKILLS.DAT
            </h2>
            <span className="text-secondary font-mono text-xl opacity-80">&lt;</span> 
          </div>
          <div className="h-px w-full max-w-sm bg-gradient-to-l from-primary via-secondary to-transparent mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
          {skillCategories.map((category, idx) => {
            const styles = getColorStyles(category.colorType);
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-card/40 backdrop-blur-xl border border-border p-8 relative overflow-hidden group transition-all duration-500"
              >
                {/* Animated background glow */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${styles.blob} rounded-full blur-[50px] transition-colors duration-500 pointer-events-none`} />
                
                <div className="flex items-center gap-5 mb-10 relative z-10">
                  <div className={`p-4 bg-background border border-border transition-colors duration-500 ${styles.glow}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-bold uppercase tracking-wider">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3 relative z-10">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx * 0.2) + (i * 0.05) }}
                      className="font-mono text-sm px-4 py-2 border border-border bg-background/50 text-muted-foreground hover:text-white hover:border-white hover:bg-white/10 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
