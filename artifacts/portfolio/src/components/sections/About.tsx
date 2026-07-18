import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="text-secondary font-mono text-xl opacity-80">&gt;</span> 
            <h2 className="text-3xl md:text-6xl font-display font-bold text-primary glitch" data-text="ABOUT.EXE">
              ABOUT.EXE
            </h2>
          </div>
          <div className="h-px w-full max-w-sm bg-gradient-to-r from-primary via-secondary to-transparent" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative bg-card/40 backdrop-blur-xl border border-primary/30 p-8 md:p-12 neon-box scanlines group hover:border-primary/60 transition-colors duration-500"
        >
          {/* Decorative terminal corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary transition-all duration-300 group-hover:w-6 group-hover:h-6"></div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 flex flex-col gap-6 font-mono text-base md:text-lg text-card-foreground leading-relaxed">
              <div className="space-y-2">
                <p className="flex items-center gap-3">
                  <span className="text-accent min-w-24">User:</span> 
                  <span className="text-white font-bold tracking-wider">Manish Svaveg</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-accent min-w-24">Location:</span> 
                  <span className="text-muted-foreground">Delhi, IN</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-accent min-w-24">Status:</span> 
                  <span className="text-muted-foreground">15-year-old developer & founder of <span className="text-primary font-bold">LearnovaX</span>.</span>
                </p>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-primary/30 to-transparent my-2" />
              
              <p className="text-muted-foreground">
                I build AI-powered applications, tools, and platforms. Hackathon enthusiast. Currently preparing for IIT while scaling my projects. I leverage <span className="text-white">AI-assisted development</span> to move faster and build more ambitious ideas than most consider possible at my age.
              </p>
              <p className="text-muted-foreground italic border-l-2 border-secondary pl-4 py-1 bg-secondary/5">
                "Code is just the tool. The goal is to build the future."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
