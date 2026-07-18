import { useRef, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/** Detect WebGL support before instantiating Three.js renderer */
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const ctx =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!ctx) return false;
    // Quick sanity-check: if vendor is "0xffff" the driver is a dummy
    const dbgInfo = (ctx as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (dbgInfo) {
      const vendor = (ctx as WebGLRenderingContext).getParameter(dbgInfo.UNMASKED_VENDOR_WEBGL);
      if (vendor === '0xffff') return false;
    }
    return true;
  } catch {
    return false;
  }
}

function NeonGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 1]} />
      <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.3} />
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.1} />
      </mesh>
    </mesh>
  );
}

function FloatingParticles() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.4} color="#8B5CF6" />
      <Sparkles count={100} scale={20} size={3} speed={0.2} opacity={0.3} color="#FF006E" />
      <Sparkles count={150} scale={10} size={1.5} speed={0.5} opacity={0.5} color="#00D4FF" />
    </>
  );
}

/** CSS-only fallback for environments without WebGL (screenshots, older browsers) */
function CSSBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-background pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,212,255,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(139,92,246,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_70%,rgba(255,0,110,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  );
}

interface EBState { hasError: boolean }
class CanvasErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? <CSSBackground /> : this.props.children;
  }
}

export default function Scene() {
  // Skip WebGL entirely if the environment can't support it
  if (!isWebGLAvailable()) {
    return <CSSBackground />;
  }

  return (
    <CanvasErrorBoundary>
      <div className="fixed inset-0 z-[-1] bg-background pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ pointerEvents: 'auto' }}
          gl={{ failIfMajorPerformanceCaveat: false }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00D4FF" intensity={2} />
          <pointLight position={[-10, -10, -10]} color="#FF006E" intensity={2} />
          <NeonGlobe />
          <FloatingParticles />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
