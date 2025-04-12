import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HalfSection = styled(motion.div)<{ $backgroundColor: string }>`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$backgroundColor};
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: background-color 0.4s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 5.5rem;
  font-weight: 400;
  color: white;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  z-index: 2;
  max-width: 80%;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;

  span {
    display: block;
    margin-bottom: 0.3rem;
  }

  @media (max-width: 768px) {
    font-size: 3.2rem;
    max-width: 90%;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  max-width: 70%;
  margin: 1.5rem 0;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
`;


const MotionLink = motion(Link);

const StyledButton = styled(MotionLink)`
  background-color: white;
  color: black;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 3rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  display: inline-block;
  text-decoration: none;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const BackgroundPattern = styled.div<{ $position: string }>`
  position: absolute;
  ${(props) => (props.$position === "left" ? "right: -80px;" : "left: -80px;")}
  ${(props) => (props.$position === "left" ? "bottom: -80px;" : "top: -80px;")}
  width: 40vw;
  height: 40vw;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  z-index: 1;
`;

const SplitGallery: React.FC = () => {
  return (
    <Container>
      <HalfSection
        $backgroundColor="#0F0F0F"
        initial={{ backgroundColor: "#0F0F0F" }}
        whileHover={{ backgroundColor: "#21201D" }}
        transition={{ duration: 0.5 }}
      >
        <BackgroundPattern $position="left" />
        <SectionTitle>
          <span>Scented</span>
          <span>Stories</span>
          <span>Awaiting You</span>
        </SectionTitle>
        <StyledButton to="/scents/all" whileHover={{ y: -5 }} whileTap={{ y: 0 }}>
          Explore & Collaborate
        </StyledButton>
      </HalfSection>

      <HalfSection
        $backgroundColor="#000000"
        initial={{ backgroundColor: "#000000" }}
        whileHover={{ backgroundColor: "#1A1A1A" }}
        transition={{ duration: 0.5 }}
      >
        <BackgroundPattern $position="right" />
        <SectionTitle>
          <span>Infuse Your</span>
          <span>Story with</span>
          <span>Scent</span>
        </SectionTitle>
        <StyledButton
          to="/scentstudio"
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
        >
          Start Creating
        </StyledButton>
      </HalfSection>
    </Container>
  );
};

export default SplitGallery;
