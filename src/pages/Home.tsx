import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// 3D 모델 컴포넌트
const PerfumeBottle = () => (
  <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
    <mesh>
      <cylinderGeometry args={[0.5, 0.8, 2, 32]} />
      <meshStandardMaterial color="#92847A" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
    </mesh>
    <mesh position={[0, 1.2, 0]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#F5F5F5" metalness={0.9} roughness={0.1} />
    </mesh>
  </Float>
);

// 파티클 생성 함수
const generateParticles = (amount: number) => {
  return [...Array(amount)].map((_, i) => {
    const size = Math.random() * 10 + 2;
    const left = `${Math.random() * 100}%`;
    const duration = Math.random() * 20 + 10;

    return (
      <div
        key={i}
        className="particle"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: left,
          animationDuration: `${duration}s`,
        }}
      />
    );
  });
};

const Home: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="particle-background">
        {generateParticles(20)}
      </div>

      <div className="canvas-container">
        <Canvas>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <PerfumeBottle />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        </Canvas>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">Scent Studio</h1>
        <p className="hero-subtitle">
          Lay Out Your Dream by Creating Own Scent
        </p>

        <div className="hero-button-container">
          <Link to="/chat" className="hero-chat-btn">
            Create Scent
          </Link>
          <Link to="/gallery" className="hero-gallery-btn">
            Scent Studio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
