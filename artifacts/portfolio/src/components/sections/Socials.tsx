import { motion } from 'framer-motion';
import { SiGithub, SiYoutube, SiInstagram, SiThreads, SiDiscord } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const socials = [
  { name: 'GitHub',    icon: SiGithub,     url: 'https://github.com/ManishSVAVEG',                        color: '#00D4FF' },
  { name: 'YouTube',  icon: SiYoutube,     url: 'https://youtube.com/@digitalworldsphere',                color: '#FF006E' },
  { name: 'Instagram',icon: SiInstagram,   url: 'https://www.instagram.com/manishsingh37414',             color: '#8B5CF6' },
  { name: 'LinkedIn', icon: FaLinkedinIn,  url: 'https://www.linkedin.com/in/manish-kumar-034789341',     color: '#00D4FF' },
  { name: 'Threads',  icon: SiThreads,     url: 'https://www.threads.com/@manishsingh37414',              color: '#8B5CF6' },
  { name: 'Discord',  icon: SiDiscord,     url: 'https://discord.gg/vKPzQCGr',                            color: '#FF006E' },
];

export default function Socials() {
  return (
    <section className="py-24 px-6 relative border-y border-border/50 bg-card/30 backdrop-blur-xl z-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-display font-bold text-muted-foreground mb-12 flex items-center justify-center gap-6"
        >
          <span className="w-12 h-px bg-gradient-to-l from-border to-transparent"></span>
          <span className="tracking-widest">CONNECT.LINK</span>
          <span className="w-12 h-px bg-gradient-to-r from-border to-transparent"></span>
        </motion.h2>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {socials.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="group relative p-5 md:p-6 bg-background border border-border/50 flex items-center justify-center overflow-hidden rounded-xl"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-[20px]"
                  style={{ backgroundColor: social.color }}
                />
                <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-1000 bg-[linear-gradient(transparent,rgba(255,255,255,0.1),transparent)] opacity-50" />
                <Icon 
                  size={36} 
                  className="relative z-10 text-muted-foreground group-hover:text-white transition-all duration-300" 
                />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:-bottom-1 transition-all duration-300 whitespace-nowrap">
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
