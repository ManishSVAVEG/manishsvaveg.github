import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const CELL = 20;
const COLS = 24;
const ROWS = 18;
const W = COLS * CELL;
const H = ROWS * CELL;
const TICK = 120;

type Dir = 'U' | 'D' | 'L' | 'R';
type Pt = { x: number; y: number };

const rand = (n: number) => Math.floor(Math.random() * n);
const newFood = (snake: Pt[]): Pt => {
  let p: Pt;
  do { p = { x: rand(COLS), y: rand(ROWS) }; }
  while (snake.some(s => s.x === p.x && s.y === p.y));
  return p;
};

type Phase = 'idle' | 'playing' | 'over';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    snake: [{ x: 12, y: 9 }, { x: 11, y: 9 }, { x: 10, y: 9 }],
    dir: 'R' as Dir,
    nextDir: 'R' as Dir,
    food: { x: 18, y: 9 } as Pt,
    score: 0,
    tick: 0,
  });
  const phaseRef = useRef<Phase>('idle');
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const [phase, setPhase] = useState<Phase>('idle');
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(() => {
    try { return parseInt(localStorage.getItem('cyber-snake-hi') || '0', 10); } catch { return 0; }
  });

  // Lock / unlock page scroll while game is active
  useEffect(() => {
    if (phase === 'playing') {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [phase]);

  // Prevent arrow/space keys from scrolling
  useEffect(() => {
    const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
    const handler = (e: KeyboardEvent) => {
      if (phaseRef.current === 'playing' && SCROLL_KEYS.includes(e.key)) e.preventDefault();
    };
    window.addEventListener('keydown', handler, { passive: false });
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    ctx.fillStyle = '#050a0f';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(0,212,255,0.05)';
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, H); ctx.stroke(); }
    for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(W, r * CELL); ctx.stroke(); }

    // Food
    const fx = s.food.x * CELL + CELL / 2;
    const fy = s.food.y * CELL + CELL / 2;
    const pulse = 0.7 + 0.3 * Math.sin(Date.now() / 200);
    ctx.save();
    ctx.shadowColor = '#FF006E';
    ctx.shadowBlur = 18 * pulse;
    ctx.fillStyle = `rgba(255,0,110,${pulse})`;
    ctx.beginPath(); ctx.arc(fx, fy, CELL / 2 - 2, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 4;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(fx, fy, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Snake
    s.snake.forEach((seg, i) => {
      const isHead = i === 0;
      const t = i / s.snake.length;
      const alpha = 1 - t * 0.5;
      ctx.save();
      if (isHead) {
        ctx.shadowColor = '#00D4FF'; ctx.shadowBlur = 16; ctx.fillStyle = '#00D4FF';
      } else {
        ctx.shadowColor = `rgba(0,212,255,${alpha})`; ctx.shadowBlur = 6;
        ctx.fillStyle = `rgba(${Math.round(t * 139)},${Math.round(212 - t * 120)},${Math.round(255 - t * 9)},${alpha})`;
      }
      const pad = isHead ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, isHead ? 5 : 3);
      ctx.fill();
      if (isHead) {
        ctx.shadowBlur = 0; ctx.fillStyle = '#050a0f';
        const d = s.dir;
        const rx = seg.x * CELL + pad, ry = seg.y * CELL + pad, rw = CELL - pad * 2, rh = CELL - pad * 2;
        const ex1 = d === 'L' ? rx + 2 : d === 'R' ? rx + rw - 8 : rx + 3;
        const ey1 = d === 'U' ? ry + 2 : d === 'D' ? ry + rh - 8 : ry + 3;
        const ex2 = d === 'L' ? rx + 2 : d === 'R' ? rx + rw - 8 : rx + rw - 8;
        const ey2 = d === 'U' ? ry + 2 : d === 'D' ? ry + rh - 8 : ry + rh - 8;
        ctx.beginPath(); ctx.arc(ex1 + 2, ey1 + 2, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(ex2 + 2, ey2 + 2, 2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    });
  }, []);

  const loop = useCallback((ts: number) => {
    const dt = ts - (lastTimeRef.current || ts);
    lastTimeRef.current = ts;
    const s = stateRef.current;
    s.tick += dt;
    if (s.tick >= TICK) {
      s.tick -= TICK;
      s.dir = s.nextDir;
      const head = s.snake[0];
      const next: Pt = {
        x: (head.x + (s.dir === 'R' ? 1 : s.dir === 'L' ? -1 : 0) + COLS) % COLS,
        y: (head.y + (s.dir === 'D' ? 1 : s.dir === 'U' ? -1 : 0) + ROWS) % ROWS,
      };
      const ate = next.x === s.food.x && next.y === s.food.y;
      if (s.snake.some(seg => seg.x === next.x && seg.y === next.y)) {
        phaseRef.current = 'over';
        setPhase('over');
        setHiScore(h => {
          const hi = Math.max(h, s.score);
          try { localStorage.setItem('cyber-snake-hi', String(hi)); } catch {}
          return hi;
        });
        draw(); return;
      }
      s.snake = [next, ...s.snake.slice(0, ate ? undefined : -1)];
      if (ate) { s.score++; setScore(s.score); s.food = newFood(s.snake); }
    }
    draw();
    if (phaseRef.current === 'playing') rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  useEffect(() => {
    const DIR_MAP: Record<string, Dir> = { ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R', w: 'U', s: 'D', a: 'L', d: 'R', W: 'U', S: 'D', A: 'L', D: 'R' };
    const OPP: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
    const onKey = (e: KeyboardEvent) => {
      const d = DIR_MAP[e.key];
      if (d && phaseRef.current === 'playing' && d !== OPP[stateRef.current.dir]) stateRef.current.nextDir = d;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    let startX = 0, startY = 0;
    const OPP: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
    const onTS = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const onTE = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      const d: Dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U');
      if (phaseRef.current === 'playing' && d !== OPP[stateRef.current.dir]) stateRef.current.nextDir = d;
    };
    window.addEventListener('touchstart', onTS, { passive: true });
    window.addEventListener('touchend', onTE, { passive: true });
    return () => { window.removeEventListener('touchstart', onTS); window.removeEventListener('touchend', onTE); };
  }, []);

  const startGame = () => {
    cancelAnimationFrame(rafRef.current);
    stateRef.current = { snake: [{ x: 12, y: 9 }, { x: 11, y: 9 }, { x: 10, y: 9 }], dir: 'R', nextDir: 'R', food: { x: 18, y: 9 }, score: 0, tick: 0 };
    lastTimeRef.current = 0;
    phaseRef.current = 'playing';
    setPhase('playing'); setScore(0);
    rafRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => { draw(); }, [draw]);

  return (
    <section id="game" className="py-28 sm:py-32 px-4 sm:px-6 min-h-screen relative flex items-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 flex flex-col items-center gap-3"
        >
          <div className="eyebrow">// 05 — MINI_GAME</div>
          <h2 className="text-3xl md:text-6xl font-display font-bold text-primary glitch" data-text="SNAKE.EXE">
            SNAKE.EXE
          </h2>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
          <p className="font-mono text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
            Arrow Keys / WASD / Swipe to control
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-5"
        >
          {/* Score bar */}
          <div className="flex items-center gap-6 sm:gap-10 font-mono text-xs sm:text-sm w-full max-w-[480px] px-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground tracking-widest">SCORE</span>
              <span className="text-primary font-bold tabular-nums">{String(score).padStart(3, '0')}</span>
            </div>
            <div className="flex-1 h-px bg-border/30" />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground tracking-widest">BEST</span>
              <span className="text-secondary font-bold tabular-nums">{String(hiScore).padStart(3, '0')}</span>
            </div>
          </div>

          {/* Canvas — scales to fit any screen */}
          <div
            className="relative border border-primary/25 overflow-hidden w-full"
            style={{ maxWidth: W, aspectRatio: `${W} / ${H}` }}
          >
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              style={{ display: 'block', width: '100%', height: '100%', imageRendering: 'pixelated' }}
            />

            {/* Game Over overlay */}
            {phase === 'over' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/85 backdrop-blur-sm">
                <p className="font-display text-3xl sm:text-4xl font-black text-accent mb-2 glitch" data-text="GAME OVER">GAME OVER</p>
                <p className="font-mono text-xs sm:text-sm text-muted-foreground mb-6 tracking-widest">
                  SCORE: <span className="text-primary font-bold">{score}</span>
                  {score > 0 && score === hiScore && <span className="text-secondary ml-3">NEW BEST ★</span>}
                </p>
              </div>
            )}

            {/* Idle overlay */}
            {phase === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/65 backdrop-blur-sm">
                <p className="font-display text-lg sm:text-xl font-bold text-primary tracking-[0.2em] animate-pulse">PRESS START</p>
                <p className="font-mono text-[9px] text-muted-foreground/50 mt-2 tracking-widest uppercase">Use arrow keys or swipe</p>
              </div>
            )}
          </div>

          {/* Controls row */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center w-full max-w-[480px]">
            {phase !== 'playing' && (
              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 sm:flex-none px-6 sm:px-8 py-3 font-display font-bold text-xs sm:text-sm tracking-widest text-background bg-primary hover:bg-primary/85 transition-colors uppercase"
              >
                {phase === 'idle' ? '▶  START' : '↺  RESTART'}
              </motion.button>
            )}
            {phase === 'playing' && (
              <>
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-primary tracking-widest">LIVE — {score}</span>
                </div>
                <motion.button
                  onClick={() => { cancelAnimationFrame(rafRef.current); phaseRef.current = 'idle'; setPhase('idle'); }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-3 font-display font-bold text-xs tracking-widest text-accent border border-accent/40 hover:bg-accent/10 transition-colors uppercase"
                >
                  ✕ EXIT
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
