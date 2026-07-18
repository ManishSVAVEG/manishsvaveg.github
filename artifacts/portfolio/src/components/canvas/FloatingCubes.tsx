/** Pure CSS 3D floating geometric elements — no WebGL needed */
export default function FloatingCubes() {
  const cubes = [
    { size: 40, top: '12%', left: '5%',  delay: '0s',   dur: '12s', color: 'var(--cube-cyan)',    opacity: 0.55 },
    { size: 24, top: '30%', right: '7%', delay: '2s',   dur: '9s',  color: 'var(--cube-purple)',  opacity: 0.45 },
    { size: 55, top: '65%', left: '3%',  delay: '1s',   dur: '15s', color: 'var(--cube-magenta)', opacity: 0.35 },
    { size: 18, top: '20%', right: '3%', delay: '3.5s', dur: '8s',  color: 'var(--cube-cyan)',    opacity: 0.5  },
    { size: 32, top: '75%', right: '5%', delay: '0.5s', dur: '11s', color: 'var(--cube-purple)',  opacity: 0.4  },
    { size: 14, top: '50%', left: '8%',  delay: '4s',   dur: '7s',  color: 'var(--cube-magenta)', opacity: 0.6  },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {cubes.map((c, i) => (
        <div
          key={i}
          className="cube-wrap absolute"
          style={{
            width: c.size,
            height: c.size,
            top: c.top,
            left: ('left' in c) ? (c as any).left : undefined,
            right: ('right' in c) ? (c as any).right : undefined,
            animationDelay: c.delay,
            animationDuration: c.dur,
            opacity: c.opacity,
            '--cube-color': c.color,
          } as React.CSSProperties}
        >
          <div className="cube" style={{ width: c.size, height: c.size }}>
            <div className="cube-face cube-front"  style={{ '--s': `${c.size}px` } as React.CSSProperties} />
            <div className="cube-face cube-back"   style={{ '--s': `${c.size}px` } as React.CSSProperties} />
            <div className="cube-face cube-left"   style={{ '--s': `${c.size}px` } as React.CSSProperties} />
            <div className="cube-face cube-right"  style={{ '--s': `${c.size}px` } as React.CSSProperties} />
            <div className="cube-face cube-top"    style={{ '--s': `${c.size}px` } as React.CSSProperties} />
            <div className="cube-face cube-bottom" style={{ '--s': `${c.size}px` } as React.CSSProperties} />
          </div>
        </div>
      ))}

      {/* Extra floating rings */}
      {[
        { size: 80,  top: '8%',  left: '15%', delay: '1s',   dur: '20s', color: '#00D4FF' },
        { size: 50,  top: '85%', right: '12%',delay: '3s',   dur: '16s', color: '#8B5CF6' },
        { size: 120, top: '45%', right: '2%', delay: '0s',   dur: '25s', color: '#FF006E' },
      ].map((r, i) => (
        <div
          key={`ring-${i}`}
          className="ring-wrap absolute"
          style={{
            width: r.size,
            height: r.size,
            top: r.top,
            left: ('left' in r) ? (r as any).left : undefined,
            right: ('right' in r) ? (r as any).right : undefined,
            animationDelay: r.delay,
            animationDuration: r.dur,
            '--ring-color': r.color,
          } as React.CSSProperties}
        >
          <div
            className="ring"
            style={{
              width: r.size,
              height: r.size,
              borderColor: r.color,
              boxShadow: `0 0 10px ${r.color}55, inset 0 0 10px ${r.color}22`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
