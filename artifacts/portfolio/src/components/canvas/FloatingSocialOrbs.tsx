/**
 * FloatingSocialOrbs
 * Social link icons floating across the full page height like distant planets.
 * Absolute positioning so they spread through every section, not just the viewport.
 */
import { SiGithub, SiYoutube, SiInstagram, SiThreads, SiDiscord } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';

type Orb = {
  Icon: React.ElementType;
  url: string;
  color: string;
  size: number;       // px diameter
  top: string;        // % of document height approximation via vh
  left: string;
  animDur: string;
  animDelay: string;
  driftX: number;     // px amplitude horizontal drift
  driftY: number;     // px amplitude vertical drift
  glowBlur: number;
  opacity: number;
};

const orbs: Orb[] = [
  // GitHub — top-left area (hero section)
  {
    Icon: SiGithub, url: 'https://github.com/ManishSVAVEG',
    color: '#00D4FF', size: 52, top: '8vh', left: '4%',
    animDur: '14s', animDelay: '0s', driftX: 18, driftY: 22, glowBlur: 20, opacity: 0.55,
  },
  // YouTube — top-right (hero section)
  {
    Icon: SiYoutube, url: 'https://youtube.com/@digitalworldsphere',
    color: '#FF006E', size: 44, top: '22vh', left: '88%',
    animDur: '18s', animDelay: '3s', driftX: 14, driftY: 28, glowBlur: 18, opacity: 0.45,
  },
  // LinkedIn — about section
  {
    Icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/manish-kumar-034789341',
    color: '#00D4FF', size: 38, top: '62vh', left: '92%',
    animDur: '20s', animDelay: '1s', driftX: 12, driftY: 20, glowBlur: 16, opacity: 0.40,
  },
  // Instagram — between about & projects
  {
    Icon: SiInstagram, url: 'https://www.instagram.com/manishsingh37414',
    color: '#8B5CF6', size: 46, top: '105vh', left: '3%',
    animDur: '16s', animDelay: '5s', driftX: 20, driftY: 16, glowBlur: 22, opacity: 0.50,
  },
  // Discord — projects section
  {
    Icon: SiDiscord, url: 'https://discord.gg/vKPzQCGr',
    color: '#FF006E', size: 42, top: '175vh', left: '91%',
    animDur: '22s', animDelay: '2s', driftX: 16, driftY: 24, glowBlur: 20, opacity: 0.42,
  },
  // Threads — skills section
  {
    Icon: SiThreads, url: 'https://www.threads.com/@manishsingh37414',
    color: '#8B5CF6', size: 50, top: '250vh', left: '5%',
    animDur: '19s', animDelay: '7s', driftX: 22, driftY: 18, glowBlur: 24, opacity: 0.48,
  },
  // GitHub (2nd smaller) — game section
  {
    Icon: SiGithub, url: 'https://github.com/ManishSVAVEG',
    color: '#00D4FF', size: 34, top: '320vh', left: '89%',
    animDur: '15s', animDelay: '4s', driftX: 10, driftY: 20, glowBlur: 14, opacity: 0.38,
  },
  // YouTube (2nd) — between game & socials
  {
    Icon: SiYoutube, url: 'https://youtube.com/@digitalworldsphere',
    color: '#FF006E', size: 40, top: '400vh', left: '7%',
    animDur: '24s', animDelay: '9s', driftX: 18, driftY: 14, glowBlur: 18, opacity: 0.44,
  },
  // LinkedIn (2nd) — socials section
  {
    Icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/manish-kumar-034789341',
    color: '#00D4FF', size: 36, top: '475vh', left: '85%',
    animDur: '17s', animDelay: '6s', driftX: 14, driftY: 22, glowBlur: 16, opacity: 0.40,
  },
  // Instagram (2nd) — contact section
  {
    Icon: SiInstagram, url: 'https://www.instagram.com/manishsingh37414',
    color: '#8B5CF6', size: 48, top: '555vh', left: '4%',
    animDur: '21s', animDelay: '11s', driftX: 20, driftY: 16, glowBlur: 22, opacity: 0.46,
  },
  // Discord (2nd) — near footer
  {
    Icon: SiDiscord, url: 'https://discord.gg/vKPzQCGr',
    color: '#FF006E', size: 38, top: '620vh', left: '88%',
    animDur: '13s', animDelay: '0.5s', driftX: 12, driftY: 20, glowBlur: 16, opacity: 0.38,
  },
];

export default function FloatingSocialOrbs() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 15 }}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => {
        const touchSize = Math.max(orb.size, 44);
        const pad = (touchSize - orb.size) / 2;
        return (
          <a
            key={i}
            href={orb.url}
            target="_blank"
            rel="noreferrer"
            className="absolute flex items-center justify-center group"
            style={{
              /* Transparent touch target — at least 44×44 px on mobile */
              width: touchSize,
              height: touchSize,
              top: `calc(${orb.top} - ${pad}px)`,
              left: `calc(${orb.left} - ${pad}px)`,
              pointerEvents: 'auto',
              cursor: 'pointer',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent',
              animation: `orb-float-${i % 4} ${orb.animDur} ease-in-out infinite ${orb.animDelay}`,
              '--dx': `${orb.driftX}px`,
              '--dy': `${orb.driftY}px`,
            } as React.CSSProperties}
          >
            {/* Visual sphere — decoupled from touch target size */}
            <span
              className="relative flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: orb.size,
                height: orb.size,
                background: `
                  radial-gradient(circle at 32% 28%, rgba(255,255,255,0.28) 0%, transparent 42%),
                  radial-gradient(circle at 65% 70%, rgba(0,0,0,0.55) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, color-mix(in srgb, ${orb.color} 55%, #0d1420) 0%, #060b14 75%)
                `,
                border: `1.5px solid ${orb.color}`,
                boxShadow: `
                  0 0 ${orb.glowBlur}px      ${orb.color}88,
                  0 0 ${orb.glowBlur * 2}px  ${orb.color}33,
                  0 6px 20px rgba(0,0,0,0.6),
                  inset 0 -4px 12px rgba(0,0,0,0.5),
                  inset 0 3px 8px rgba(255,255,255,0.12)
                `,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'scale(1.3) translateY(-4px)';
                el.style.boxShadow = `
                  0 0 ${orb.glowBlur * 1.5}px ${orb.color}cc,
                  0 0 ${orb.glowBlur * 3}px   ${orb.color}55,
                  0 12px 30px rgba(0,0,0,0.7),
                  inset 0 -4px 12px rgba(0,0,0,0.5),
                  inset 0 3px 8px rgba(255,255,255,0.18)
                `;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
                el.style.boxShadow = `
                  0 0 ${orb.glowBlur}px      ${orb.color}88,
                  0 0 ${orb.glowBlur * 2}px  ${orb.color}33,
                  0 6px 20px rgba(0,0,0,0.6),
                  inset 0 -4px 12px rgba(0,0,0,0.5),
                  inset 0 3px 8px rgba(255,255,255,0.12)
                `;
              }}
            >
              {/* Icon */}
              <orb.Icon
                size={orb.size * 0.44}
                color="#ffffff"
                style={{ filter: `drop-shadow(0 0 6px ${orb.color})`, flexShrink: 0 }}
              />

              {/* Orbit ring */}
              <span
                className="absolute rounded-full"
                style={{
                  width: orb.size * 1.65,
                  height: orb.size * 0.42,
                  border: `1px solid ${orb.color}55`,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%) rotateX(72deg)',
                  pointerEvents: 'none',
                  boxShadow: `0 0 6px ${orb.color}33`,
                }}
              />
            </span>
          </a>
        );
      })}

      <style>{`
        @keyframes orb-float-0 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25%       { transform: translate(var(--dx), calc(var(--dy) * -1)) rotate(3deg); }
          50%       { transform: translate(calc(var(--dx) * 0.6), var(--dy)) rotate(-2deg); }
          75%       { transform: translate(calc(var(--dx) * -0.8), calc(var(--dy) * 0.5)) rotate(1deg); }
        }
        @keyframes orb-float-1 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          30%       { transform: translate(calc(var(--dx) * -1), calc(var(--dy) * 0.7)) rotate(-3deg); }
          60%       { transform: translate(calc(var(--dx) * 0.5), calc(var(--dy) * -1)) rotate(2deg); }
          80%       { transform: translate(var(--dx), calc(var(--dy) * 0.3)) rotate(-1deg); }
        }
        @keyframes orb-float-2 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          20%       { transform: translate(calc(var(--dx) * 0.8), var(--dy)) rotate(2deg); }
          55%       { transform: translate(calc(var(--dx) * -0.6), calc(var(--dy) * -0.8)) rotate(-3deg); }
          80%       { transform: translate(calc(var(--dx) * 0.3), calc(var(--dy) * 0.6)) rotate(1deg); }
        }
        @keyframes orb-float-3 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          35%       { transform: translate(calc(var(--dx) * -0.7), calc(var(--dy) * -1)) rotate(-2deg); }
          65%       { transform: translate(var(--dx), calc(var(--dy) * 0.4)) rotate(3deg); }
          85%       { transform: translate(calc(var(--dx) * -0.3), var(--dy)) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
}
