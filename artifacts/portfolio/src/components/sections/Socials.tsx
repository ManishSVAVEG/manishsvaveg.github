import { motion } from 'framer-motion';
import { SiGithub, SiYoutube, SiInstagram, SiThreads, SiDiscord } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

const socials = [
  { name: 'GitHub',    icon: SiGithub,     url: 'https://github.com/ManishSVAVEG',                        color: '#00D4FF', shadow: 'rgba(0,212,255,0.5)' },
  { name: 'YouTube',  icon: SiYoutube,     url: 'https://youtube.com/@digitalworldsphere',                color: '#FF006E', shadow: 'rgba(255,0,110,0.5)' },
  { name: 'Instagram',icon: SiInstagram,   url: 'https://www.instagram.com/manishsingh37414',             color: '#8B5CF6', shadow: 'rgba(139,92,246,0.5)' },
  { name: 'LinkedIn', icon: FaLinkedinIn,  url: 'https://www.linkedin.com/in/manish-kumar-034789341',     color: '#00D4FF', shadow: 'rgba(0,212,255,0.5)' },
  { name: 'Threads',  icon: SiThreads,     url: 'https://www.threads.com/@manishsingh37414',              color: '#8B5CF6', shadow: 'rgba(139,92,246,0.5)' },
  { name: 'Discord',  icon: SiDiscord,     url: 'https://discord.gg/vKPzQCGr',                            color: '#FF006E', shadow: 'rgba(255,0,110,0.5)' },
];

export default function Socials() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative border-y border-border/40 bg-card/20 backdrop-blur-xl z-20 overflow-hidden">

      {/* Grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.025)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Top/bottom gradient fades */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3"
        >
          <div className="eyebrow justify-center">// 06 — NETWORK_LINKS</div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-display font-bold text-muted-foreground mb-12 flex items-center justify-center gap-5"
        >
          <span className="w-12 h-px bg-gradient-to-l from-border/60 to-transparent" />
          <span className="tracking-widest text-foreground/80">CONNECT.LINK</span>
          <span className="w-12 h-px bg-gradient-to-r from-border/60 to-transparent" />
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
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
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.12, y: -6 }}
                className="group relative p-4 sm:p-5 md:p-6 bg-background/80 border border-border/50 flex flex-col items-center justify-center overflow-hidden transition-all duration-300 min-w-[72px] sm:min-w-[80px]"
                style={{
                  boxShadow: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = social.color + '80';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${social.shadow}, 0 0 40px ${social.shadow.replace('0.5', '0.15')}`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                  style={{ backgroundColor: social.color }}
                />

                {/* Shimmer sweep */}
                <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[-100%] transition-transform duration-700 bg-[linear-gradient(transparent,rgba(255,255,255,0.08),transparent)] opacity-60" />

                <Icon
                  size={32}
                  className="relative z-10 text-muted-foreground transition-all duration-300"
                  style={{ color: undefined }}
                  onMouseEnter={() => {}}
                />

                {/* Name label */}
                <span
                  className="relative z-10 mt-2 text-[9px] font-mono tracking-widest uppercase transition-all duration-300 text-muted-foreground/50 group-hover:text-white/80"
                >
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
