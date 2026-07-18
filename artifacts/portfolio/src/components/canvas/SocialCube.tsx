import { useState, useRef, useEffect } from 'react';
import { SiGithub, SiYoutube, SiInstagram, SiThreads, SiDiscord } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import logoPath from '@assets/Copilot_20260718_093228_1784351878407.png';

type Face = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

const FACE_ORDER: Face[] = ['front', 'right', 'back', 'left'];

export default function SocialCube() {
  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(12);
  const [paused, setPaused] = useState(false);
  const [activeFace, setActiveFace] = useState(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const rotRef = useRef(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, rotY: 0, rotX: 0 });

  // Auto-rotate
  useEffect(() => {
    const tick = (ts: number) => {
      if (!paused && !isDragging.current) {
        const dt = lastRef.current ? ts - lastRef.current : 0;
        lastRef.current = ts;
        rotRef.current += dt * 0.025;
        setRotY(rotRef.current);
        setActiveFace(Math.round(rotRef.current / 90) % FACE_ORDER.length);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  // Mouse drag rotation
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // stop text-selection drag interfering with page scroll
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, rotY, rotX };
    setPaused(true);
  };
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const newY = dragStart.current.rotY + dx * 0.5;
      const newX = Math.max(-40, Math.min(40, dragStart.current.rotX - dy * 0.3));
      rotRef.current = newY;
      setRotY(newY);
      setRotX(newX);
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [rotX, rotY]);

  // Touch drag
  useEffect(() => {
    const el = document.getElementById('social-cube-wrap');
    if (!el) return;
    const onTS = (e: TouchEvent) => {
      e.preventDefault(); // stop page scroll from starting
      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, rotY, rotX };
      setPaused(true);
    };
    const onTM = (e: TouchEvent) => {
      if (!isDragging.current) return;
      e.preventDefault(); // block scroll while dragging cube
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;
      const newY = dragStart.current.rotY + dx * 0.5;
      const newX = Math.max(-40, Math.min(40, dragStart.current.rotX - dy * 0.3));
      rotRef.current = newY;
      setRotY(newY);
      setRotX(newX);
    };
    const onTE = () => {
      isDragging.current = false;
      // short delay so auto-rotate resumes, then page scroll unlocks naturally
      setTimeout(() => setPaused(false), 1000);
    };
    // { passive: false } is required so preventDefault() is allowed
    el.addEventListener('touchstart', onTS, { passive: false });
    el.addEventListener('touchmove', onTM, { passive: false });
    el.addEventListener('touchend', onTE);
    return () => {
      el.removeEventListener('touchstart', onTS);
      el.removeEventListener('touchmove', onTM);
      el.removeEventListener('touchend', onTE);
    };
  }, [rotY, rotX]);

  const socials = [
    { Icon: SiGithub,    label: 'GitHub',    url: 'https://github.com/ManishSVAVEG',                    color: '#00D4FF' },
    { Icon: SiYoutube,   label: 'YouTube',   url: 'https://youtube.com/@digitalworldsphere',            color: '#FF006E' },
    { Icon: SiInstagram, label: 'Instagram', url: 'https://www.instagram.com/manishsingh37414',         color: '#8B5CF6' },
    { Icon: FaLinkedinIn,label: 'LinkedIn',  url: 'https://www.linkedin.com/in/manish-kumar-034789341', color: '#00D4FF' },
    { Icon: SiThreads,   label: 'Threads',   url: 'https://www.threads.com/@manishsingh37414',          color: '#8B5CF6' },
    { Icon: SiDiscord,   label: 'Discord',   url: 'https://discord.gg/vKPzQCGr',                        color: '#FF006E' },
  ];

  const sz = 220;
  const hs = sz / 2;

  return (
    <div id="social-cube-wrap" className="flex flex-col items-center gap-4" style={{ userSelect: 'none', touchAction: 'none' }}>
      <div
        style={{ width: sz, height: sz, perspective: 900, cursor: isDragging.current ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onClick={() => { if (!isDragging.current) setPaused(p => !p); }}
      >
        <div
          className="cube-scene"
          style={{
            width: sz,
            height: sz,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${-rotX}deg) rotateY(${rotY}deg)`,
            transition: isDragging.current ? 'none' : 'transform 0.05s linear',
          }}
        >
          {/* FRONT — Profile */}
          <div className="cube-face-3d face-front" style={{ '--hs': `${hs}px` } as React.CSSProperties}>
            <div className="face-inner">
              <img src={logoPath} alt="MS" className="face-logo" />
              <div className="face-name">MANISH<br />SVAVEG</div>
              <div className="face-tag">15yo · Delhi · IIT Aspirant</div>
            </div>
          </div>

          {/* BACK — YouTube + Instagram */}
          <div className="cube-face-3d face-back" style={{ '--hs': `${hs}px` } as React.CSSProperties}>
            <div className="face-inner">
              <div className="face-label">FOLLOW</div>
              <div className="face-links">
                {[socials[1], socials[2]].map(({ Icon, label, url, color }) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer"
                    className="face-link" style={{ '--link-color': color } as React.CSSProperties}
                    onClick={e => e.stopPropagation()}>
                    <Icon size={22} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* LEFT — GitHub + LinkedIn */}
          <div className="cube-face-3d face-left" style={{ '--hs': `${hs}px` } as React.CSSProperties}>
            <div className="face-inner">
              <div className="face-label">CODE</div>
              <div className="face-links">
                {[socials[0], socials[3]].map(({ Icon, label, url, color }) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer"
                    className="face-link" style={{ '--link-color': color } as React.CSSProperties}
                    onClick={e => e.stopPropagation()}>
                    <Icon size={22} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Threads + Discord */}
          <div className="cube-face-3d face-right" style={{ '--hs': `${hs}px` } as React.CSSProperties}>
            <div className="face-inner">
              <div className="face-label">JOIN</div>
              <div className="face-links">
                {[socials[4], socials[5]].map(({ Icon, label, url, color }) => (
                  <a key={label} href={url} target="_blank" rel="noreferrer"
                    className="face-link" style={{ '--link-color': color } as React.CSSProperties}
                    onClick={e => e.stopPropagation()}>
                    <Icon size={22} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* TOP — Tagline */}
          <div className="cube-face-3d face-top" style={{ '--hs': `${hs}px` } as React.CSSProperties}>
            <div className="face-inner face-top-inner">
              <div className="face-tag">15yo · Delhi · IIT Aspirant</div>
              <div className="face-tag2">AI · Android · React Native</div>
            </div>
          </div>

          {/* BOTTOM — Email */}
          <div className="cube-face-3d face-bottom" style={{ '--hs': `${hs}px` } as React.CSSProperties}>
            <div className="face-inner">
              <Mail size={24} color="#00D4FF" />
              <a href="mailto:manishkumar37414@gmail.com"
                className="face-email"
                onClick={e => e.stopPropagation()}>
                manishkumar37414@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Face indicator dots */}
      <div className="cube-dots">
        {FACE_ORDER.map((_, i) => (
          <span key={i} className={`cube-dot${(Math.round((-rotY) / 90 % 4 + 4) % 4) === i ? ' active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
