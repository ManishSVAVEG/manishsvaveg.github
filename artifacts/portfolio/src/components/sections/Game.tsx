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

  // useState MUST come before useEffect that references these values
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

  // Prevent arrow/space keys from scrolling the page during gameplay
  useEffect(() => {
    const SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
    const handler = (e: KeyboardEvent) => {
      if (phaseRef.current === 'playing' && SCROLL_KEYS.includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handler, { passive: false });
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // --- Drawing ---
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    // Background
    ctx.fillStyle = '#050a0f';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(0,212,255,0.06)';
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= COLS; c++) {
      ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, H); ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(W, r * CELL); ctx.stroke();
    }

    // Food
    const fx = s.food.x * CELL + CELL / 2;
    const fy = s.food.y * CELL + CELL / 2;
    const pulse = 0.7 + 0.3 * Math.sin(Date.now() / 200);
    ctx.save();
    ctx.shadowColor = '#FF006E';
    ctx.shadowBlur = 20 * pulse;
    ctx.fillStyle = `rgba(255,0,110,${pulse})`;
    ctx.beginPath();
    ctx.arc(fx, fy, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 5;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(fx, fy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Snake
    s.snake.forEach((seg, i) => {
      const isHead = i === 0;
      const t = i / s.snake.length;
      const alpha = 1 - t * 0.5;

      ctx.save();
      if (isHead) {
        ctx.shadowColor = '#00D4FF';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#00D4FF';
      } else {
        ctx.shadowColor = `rgba(0,212,255,${alpha})`;
        ctx.shadowBlur = 8;
        const r = Math.round(0 + t * 139);
        const g = Math.round(212 - t * 120);
        const b = Math.round(255 - t * 9);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      }

      const pad = isHead ? 1 : 2;
      const rx = seg.x * CELL + pad;
      const ry = seg.y * CELL + pad;
      const rw = CELL - pad * 2;
      const rh = CELL - pad * 2;
      const rad = isHead ? 5 : 3;

      ctx.beginPath();
      ctx.roundRect(rx, ry, rw, rh, rad);
      ctx.fill();

      // Head eyes
      if (isHead) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#050a0f';
        const dir = s.dir;
        const ex1 = dir === 'L' ? rx + 2 : dir === 'R' ? rx + rw - 8 : rx + 3;
        const ey1 = dir === 'U' ? ry + 2 : dir === 'D' ? ry + rh - 8 : ry + 3;
        const ex2 = dir === 'L' ? rx + 2 : dir === 'R' ? rx + rw - 8 : rx + rw - 8;
        const ey2 = dir === 'U' ? ry + 2 : dir === 'D' ? ry + rh - 8 : ry + rh - 8;
        ctx.beginPath(); ctx.arc(ex1 + 2, ey1 + 2, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(ex2 + 2, ey2 + 2, 2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    });
  }, []);

  // --- Game loop ---
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
      const hitSelf = s.snake.some(seg => seg.x === next.x && seg.y === next.y);
      if (hitSelf) {
        phaseRef.current = 'over';
        setPhase('over');
        setHiScore(h => {
          const hi = Math.max(h, s.score);
          try { localStorage.setItem('cyber-snake-hi', String(hi)); } catch {}
          return hi;
        });
        draw();
        return;
      }
      s.snake = [next, ...s.snake.slice(0, ate ? undefined : -1)];
      if (ate) {
        s.score++;
        setScore(s.score);
        s.food = newFood(s.snake);
      }
    }
    draw();
    if (phaseRef.current === 'playing') rafRef.current = requestAnimationFrame(loop);
  }, [draw]);

  // --- Input ---
  useEffect(() => {
    const DIR_MAP: Record<string, Dir> = {
      ArrowUp: 'U', ArrowDown: 'D', ArrowLeft: 'L', ArrowRight: 'R',
      w: 'U', s: 'D', a: 'L', d: 'R',
      W: 'U', S: 'D', A: 'L', D: 'R',
    };
    const OPP: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
    const onKey = (e: KeyboardEvent) => {
      const d = DIR_MAP[e.key];
      if (d && phaseRef.current === 'playing') {
        if (d !== OPP[stateRef.current.dir]) stateRef.current.nextDir = d;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // --- Touch swipe ---
  useEffect(() => {
    let startX = 0, startY = 0;
    const OPP: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
    const onTS = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const onTE = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      let d: Dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'R' : 'L') : (dy > 0 ? 'D' : 'U');
      if (phaseRef.current === 'playing' && d !== OPP[stateRef.current.dir]) {
        stateRef.current.nextDir = d;
      }
    };
    window.addEventListener('touchstart', onTS, { passive: true });
    window.addEventListener('touchend', onTE, { passive: true });
    return () => { window.removeEventListener('touchstart', onTS); window.removeEventListener('touchend', onTE); };
  }, []);

  const startGame = () => {
    cancelAnimationFrame(rafRef.current);
    stateRef.current = {
      snake: [{ x: 12, y: 9 }, { x: 11, y: 9 }, { x: 10, y: 9 }],
      dir: 'R', nextDir: 'R',
      food: { x: 18, y: 9 },
      score: 0, tick: 0,
    };
    lastTimeRef.current = 0;
    phaseRef.current = 'playing';
    setPhase('playing');
    setScore(0);
    rafRef.current = requestAnimationFrame(loop);
  };

  // Draw idle state on mount
  useEffect(() => { draw(); }, [draw]);

  return (
    <section id="game" className="py-32 px-6 min-h-screen relative flex items-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-6xl font-display font-bold text-primary glitch" data-text="SNAKE.EXE">
            SNAKE.EXE
          </h2>
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-primary to-transparent mt-4" />
          <p className="mt-4 font-mono text-xs text-muted-foreground tracking-widest">
            USE ARROW KEYS / WASD / SWIPE TO CONTROL
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          {/* Score display */}
          <div className="flex items-center gap-8 font-mono text-sm">
            <span className="text-muted-foreground tracking-widest">
              SCORE: <span className="text-primary font-bold">{score}</span>
            </span>
            <span className="text-muted-foreground tracking-widest hidden sm:inline">
              HI-SCORE: <span className="text-secondary font-bold">{hiScore}</span>
            </span>
          </div>

          {/* Canvas wrapper */}
          <div className="relative border border-primary/30 shadow-[0_0_30px_rgba(0,212,255,0.1)] overflow-hidden"
               style={{ maxWidth: '100%', width: W }}>
            <div style={{ width: W, maxWidth: '100%', overflowX: 'auto' }}>
              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                style={{ display: 'block', imageRendering: 'pixelated' }}
              />
            </div>

            {/* Game Over overlay */}
            {phase === 'over' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="text-center">
                  <p className="font-display text-4xl font-black text-accent mb-2 glitch" data-text="GAME OVER">GAME OVER</p>
                  <p className="font-mono text-sm text-muted-foreground mb-6">FINAL SCORE: <span className="text-primary">{score}</span></p>
                </div>
              </div>
            )}

            {/* Idle overlay */}
            {phase === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
                <p className="font-display text-xl font-bold text-primary tracking-widest animate-pulse">PRESS START</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {phase !== 'playing' && (
              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 font-display font-bold text-sm tracking-widest text-background bg-primary hover:bg-primary/80 transition-colors uppercase"
                style={{ boxShadow: '0 0 20px rgba(0,212,255,0.4)' }}
              >
                {phase === 'idle' ? '▶ START' : '↺ RESTART'}
              </motion.button>
            )}
            {phase === 'playing' && (
              <>
                <div className="flex items-center gap-3 font-mono text-sm">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-primary tracking-widest">SCORE: {score}</span>
                </div>
                {/* EXIT — restores page scroll immediately */}
                <motion.button
                  onClick={() => {
                    cancelAnimationFrame(rafRef.current);
                    phaseRef.current = 'idle';
                    setPhase('idle');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 font-display font-bold text-xs tracking-widest text-accent border border-accent/50 hover:bg-accent/10 transition-colors uppercase"
                  style={{ boxShadow: '0 0 12px rgba(255,0,110,0.2)' }}
                >
                  ✕ EXIT
                </motion.button>
              </>
            )}
            <div className="font-mono text-xs text-muted-foreground tracking-widest hidden sm:block">
              HI-SCORE: <span className="text-secondary">{hiScore}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
