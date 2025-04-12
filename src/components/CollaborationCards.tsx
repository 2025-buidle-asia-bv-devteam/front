import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CardsSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 5rem auto;
  padding: 0 2rem;
`;

const CardsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #fff;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.03em;
`;

const CardsDescription = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem auto;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background-color: #0d0d0d;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: #f5f1ea;
    transform: translateY(-10px);
    border-color: transparent;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);

    h3,
    p {
      color: #111;
    }
  }
`;

const CardContent = styled.div`
  z-index: 1;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #fff;
  transition: color 0.3s ease;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.03em;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
`;

const CardButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  z-index: 1;
  font-family: "Inter", sans-serif;
  margin-top: 2rem;

  ${Card}:hover & {
    background-color: #111;
    color: #fff;
    border-color: transparent;
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  top: 50%;
  right: -50px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(146, 132, 122, 0.1) 0%,
    rgba(146, 132, 122, 0) 70%
  );
  transform: translateY(-50%);
  transition: all 0.4s ease;
  opacity: 0.2;

  ${Card}:hover & {
    background: radial-gradient(
      circle,
      rgba(146, 132, 122, 0.2) 0%,
      rgba(146, 132, 122, 0) 70%
    );
    right: -20px;
    opacity: 1;
  }
`;

const CollaborationCards: React.FC = () => {
  return (
    <CardsSection>
      <CardsTitle>Collaboration Status</CardsTitle>
      <CardsDescription>
        Experience the power of collaborative creation. Join a network of
        artists exploring new scent dimensions.
      </CardsDescription>

      <CardsContainer>
        <Card whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
          <BackgroundDecoration />
          <CardContent>
            <CardTitle>Waiting for Collaboration</CardTitle>
            <CardDescription>
              Your scent is now publicly displayed. Artists can propose
              collaborative works.
            </CardDescription>
          </CardContent>
          <CardButton>View Proposals</CardButton>
        </Card>

        <Card whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
          <BackgroundDecoration />
          <CardContent>
            <CardTitle>Propose a Collaboration</CardTitle>
            <CardDescription>
              Found a scent that inspires you? Express your interpretation and
              request to join.
            </CardDescription>
          </CardContent>
          <CardButton>Start Creating</CardButton>
        </Card>
      </CardsContainer>
    </CardsSection>
  );
};

export default CollaborationCards;
