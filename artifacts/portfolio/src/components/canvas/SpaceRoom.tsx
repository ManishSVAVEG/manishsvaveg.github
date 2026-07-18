/**
 * SpaceRoom — outer space environment.
 * Pure CSS 3D: stars, nebulae, planets, floating geometric debris.
 * Zero WebGL — works on every device.
 */
export default function SpaceRoom() {
  // Floating geometric shapes — each has its own orbit params
  const shapes = [
    // type, size, top, left, animDur, animDelay, color, rotDur
    { type: 'tri',  sz: 44,  top: '8%',  left: '6%',  dur: '22s', delay: '0s',   col: '#00D4FF', rot: '14s' },
    { type: 'ring', sz: 70,  top: '15%', left: '82%', dur: '30s', delay: '4s',   col: '#8B5CF6', rot: '10s' },
    { type: 'hex',  sz: 36,  top: '35%', left: '88%', dur: '18s', delay: '1s',   col: '#FF006E', rot: '8s'  },
    { type: 'cube', sz: 28,  top: '60%', left: '5%',  dur: '25s', delay: '7s',   col: '#00D4FF', rot: '12s' },
    { type: 'tri',  sz: 22,  top: '72%', left: '75%', dur: '20s', delay: '3s',   col: '#8B5CF6', rot: '9s'  },
    { type: 'ring', sz: 50,  top: '80%', left: '15%', dur: '28s', delay: '5s',   col: '#00D4FF', rot: '15s' },
    { type: 'hex',  sz: 48,  top: '45%', left: '92%', dur: '35s', delay: '9s',   col: '#00D4FF', rot: '20s' },
    { type: 'cube', sz: 18,  top: '22%', left: '50%', dur: '16s', delay: '2s',   col: '#FF006E', rot: '7s'  },
    { type: 'tri',  sz: 32,  top: '90%', left: '55%', dur: '24s', delay: '6s',   col: '#00D4FF', rot: '11s' },
    { type: 'ring', sz: 34,  top: '5%',  left: '38%', dur: '19s', delay: '8s',   col: '#FF006E', rot: '13s' },
    { type: 'hex',  sz: 20,  top: '55%', left: '30%', dur: '26s', delay: '11s',  col: '#8B5CF6', rot: '16s' },
    { type: 'cube', sz: 38,  top: '88%', left: '90%', dur: '32s', delay: '0.5s', col: '#8B5CF6', rot: '18s' },
  ] as const;

  return (
    <div className="space-env" aria-hidden="true">
      {/* ── Deep space gradient ── */}
      <div className="space-bg" />

      {/* ── Star layers (rotate at different speeds) ── */}
      <div className="star-layer sl-1" />
      <div className="star-layer sl-2" />
      <div className="star-layer sl-3" />

      {/* ── Nebula clouds ── */}
      <div className="neb neb-1" />
      <div className="neb neb-2" />
      <div className="neb neb-3" />
      <div className="neb neb-4" />

      {/* ── Distant planets ── */}
      <div className="planet planet-a" />   {/* large blue-purple gas giant */}
      <div className="planet-ring" />       {/* saturn-style ring around planet-a */}

      {/* ── Shooting stars ── */}
      <div className="meteor m1" />
      <div className="meteor m2" />
      <div className="meteor m3" />

      {/* ── Floating 3D geometric debris ── */}
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`debris debris-${s.type}`}
          style={{
            width: s.sz,
            height: s.sz,
            top: s.top,
            left: s.left,
            '--dc': s.col,
            '--dur': s.dur,
            '--delay': s.delay,
            '--rdur': s.rot,
            '--sz': `${s.sz}px`,
            '--hs': `${s.sz / 2}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
