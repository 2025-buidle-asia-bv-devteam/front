import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

// 3D 모델 컴포넌트
const PerfumeBottle = () => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.4}
    >
      <mesh>
        <cylinderGeometry args={[0.5, 0.8, 2, 32]} />
        <meshStandardMaterial 
          color="#8A2BE2"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
};

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  z-index: 1;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 800px;
  z-index: 2;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #ddd;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
  background: var(--gradient);
  color: white;
  box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(138, 43, 226, 0.6);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const SecondaryButton = styled(Link)`
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
  border: 2px solid var(--primary);
  color: white;

  &:hover {
    background: rgba(138, 43, 226, 0.1);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const ParticleBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Particle = styled.div<{ $size: number; $left: string; $animationDuration: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: rgba(138, 43, 226, 0.5);
  border-radius: 50%;
  left: ${props => props.$left};
  top: -10%;
  animation: floatDown ${props => props.$animationDuration}s linear infinite;

  @keyframes floatDown {
    0% {
      transform: translateY(-100px) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(calc(100vh + 100px)) rotate(360deg);
      opacity: 0;
    }
  }
`;

const generateParticles = (amount: number) => {
  return [...Array(amount)].map((_, i) => (
    <Particle 
      key={i}
      $size={Math.random() * 10 + 2}
      $left={`${Math.random() * 100}%`}
      $animationDuration={Math.random() * 20 + 10}
    />
  ));
};

const Home: React.FC = () => {
  const { account, connectWallet } = useWallet();

  return (
    <>
      <HeroSection>
        <ParticleBackground>
          {generateParticles(20)}
        </ParticleBackground>
        
        <CanvasContainer>
          <Canvas>
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
              <PerfumeBottle />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls 
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
          </Canvas>
        </CanvasContainer>
        
        <HeroContent>
          <Title>퍼퓸 AI - 당신의 향을 찾아드립니다</Title>
          <Subtitle>
            블록체인 기술로 구현된 향수 AI 에이전트 서비스. 
            당신만의 향을 찾고, NFT로 소유하세요.
          </Subtitle>
          
          <ButtonContainer>
            {!account ? (
              <Button to="#" onClick={(e) => {
                e.preventDefault();
                connectWallet();
              }}>
                지금 시작하기
              </Button>
            ) : (
              <Button to="/chat">
                AI와 대화하기
              </Button>
            )}
            <SecondaryButton to="/gallery">
              향수 갤러리 둘러보기
            </SecondaryButton>
          </ButtonContainer>
        </HeroContent>
      </HeroSection>
    </>
  );
};

export default Home; 