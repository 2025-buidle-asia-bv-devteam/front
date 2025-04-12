import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import styled from "styled-components";
import HeroWorkSection from '../components/layout/HeroWorkSection';

const Section = styled.section<{ $bgColor?: string }>`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  background-color: ${(props) => props.$bgColor || "var(--dark)"};
  overflow: hidden;
  transition: background-color var(--transition-speed) ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const Button = styled(Link)`
  padding: 1rem 3rem;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 0;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  background: var(--primary);
  color: var(--light);
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: black;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  &:hover {
    background: transparent;
    color: black;
    &:after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const ScentInfo = styled.div`
  padding: 2rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: var(--light);
  position: relative;
  z-index: 1;
  text-align: left;

  h3 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
  }

  p {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 2px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ScentShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ScentItem = styled.div`
  position: relative;
  height: 450px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  transition: transform 0.5s ease;

  &:hover {
    transform: translateY(-10px);

    img {
      transform: scale(1.05);
    }
  }
`;

const ScentImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
  z-index: 0;
`;

// 3D model component
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

// particle 
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
    <>
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
            Lay out your story by creating own scent
          </p>

          <div className="hero-button-container">
            <Link to="/scentstudio" className="hero-chat-btn">
              Create Scent
            </Link>
            <Link to="/gallery" className="hero-gallery-btn">
              Scent Studio
            </Link>
          </div>
        </div>
      </section>

      {/* <section className='hero-work-section'>
        <h3>How  <span> THYMIAN </span>  works</h3>
        
        <div className='floating-words'>
          <span>Connection</span>
          <span>Story</span>
          <span>Bloom</span>
          <span>Emotion</span>
          <span>Perfume</span>
          <span>Network</span>
          <span>Memory</span>
          <span>Scent</span>
          <span>Human</span>
        </div>
      </section> */}

      <HeroWorkSection />

      <Section $bgColor="var(--gallery-bg)">
        <SectionTitle>STORY GALLERY</SectionTitle>

        <ScentShowcase>
          <ScentItem>
            <ScentImage
              src="/amber_whisper.png"
              alt="Perfume 1"
            />
            <ScentInfo>
              <h3>Amber Whisper</h3>
              <p>Deep & fascinating Amber</p>
            </ScentInfo>
          </ScentItem>

          <ScentItem>
            <ScentImage
              src="/velvet_rose.png"
              alt="Perfume 2"
            />
            <ScentInfo>
              <h3>Velvet Rose</h3>
              <p>Elegant & Sophisticated Roses</p>
            </ScentInfo>
          </ScentItem>

          <ScentItem>
            <ScentImage
              src="/ocean_breeze.png"
              alt="Perfume 3"
            />
            <ScentInfo>
              <h3>Ocean Breeze</h3>
              <p>Refreshing & Cool Ocean</p>
            </ScentInfo>
          </ScentItem>
        </ScentShowcase>

        <ButtonContainer>
          <Button to="/scentmarket">All Storys</Button>
        </ButtonContainer>
      </Section>
    </>
  );
};

export default Home;
