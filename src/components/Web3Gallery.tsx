import React, { useState } from "react";
import styled from "styled-components";
import ScentBox from "./ScentBox";
import CollabModal from "./CollabModal";
import CollaborationCards from "./CollaborationCards";
import { galleryScents, ScentWork } from "../data/mockGalleryData";
import { motion, AnimatePresence } from "framer-motion";

const GalleryContainer = styled.div`
  background-color: #0a0a0a;
  min-height: 100vh;
  width: 100%;
  color: #fff;
  padding-top: 6rem;
`;

const HeroSection = styled.section`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(146, 132, 122, 0.05) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 0;
  }
`;

const GalleryTitle = styled.h1`
  font-size: 5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  font-family: "Playfair Display", serif;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const GallerySubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FilterSection = styled.section`
  margin: 4rem 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? "#92847A" : "transparent")};
  color: ${(props) => (props.$active ? "#fff" : "rgba(255, 255, 255, 0.6)")};
  border: 1px solid
    ${(props) => (props.$active ? "#92847A" : "rgba(255, 255, 255, 0.2)")};
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "#92847A" : "rgba(255, 255, 255, 0.05)"};
    border-color: ${(props) =>
      props.$active ? "#92847A" : "rgba(255, 255, 255, 0.4)"};
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  margin: 8rem 0 2rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  text-align: center;
  letter-spacing: -0.03em;
`;

const StoryModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const StoryContent = styled(motion.div)<{
  $colorTheme: "yellow" | "pink" | "blue";
}>`
  background: #0f0f0f;
  padding: 3rem;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 16px;
  position: relative;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 8px solid
    ${(props) => {
      const colors = {
        yellow: "rgba(146, 132, 122, 0.9)",
        pink: "rgba(104, 96, 90, 0.9)",
        blue: "rgba(171, 160, 152, 0.9)",
      };
      return colors[props.$colorTheme];
    }};
`;

const StoryTitle = styled.h2`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
`;

const StoryText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  white-space: pre-line;
  color: rgba(255, 255, 255, 0.8);
`;

const StoryCreator = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
`;

const CreatorAddress = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const NotificationContainer = styled(motion.div)<{
  $colorTheme: "yellow" | "pink" | "blue";
}>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1.5rem 2rem;
  background: #0f0f0f;
  border-radius: 8px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  border-left: 4px solid
    ${(props) => {
      const colors = {
        yellow: "rgba(146, 132, 122, 0.9)",
        pink: "rgba(104, 96, 90, 0.9)",
        blue: "rgba(171, 160, 152, 0.9)",
      };
      return colors[props.$colorTheme];
    }};
  z-index: 1000;
  color: #fff;
`;

const NotificationTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #92847a;
  }
`;

const NotificationMessage = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const Web3Gallery: React.FC = () => {
  const [filter, setFilter] = useState<
    "all" | "bottled" | "ai-only" | "collab"
  >("all");
  const [selectedScent, setSelectedScent] = useState<ScentWork | null>(null);
  const [collabScent, setCollabScent] = useState<ScentWork | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    colorTheme: "yellow" | "pink" | "blue";
  } | null>(null);

  const filteredScents = React.useMemo(() => {
    switch (filter) {
      case "bottled":
        return galleryScents.filter((scent) => scent.hasBottle);
      case "ai-only":
        return galleryScents.filter(
          (scent) => !scent.hasBottle && !scent.isCollaborative
        );
      case "collab":
        return galleryScents.filter((scent) => scent.isCollaborative);
      default:
        return galleryScents;
    }
  }, [filter]);

  const handleViewStory = (scent: ScentWork) => {
    setSelectedScent(scent);
  };

  const handleProposeCollab = (scent: ScentWork) => {
    setCollabScent(scent);
  };

  const closeStory = () => {
    setSelectedScent(null);
  };

  const closeCollabModal = () => {
    setCollabScent(null);
  };

  const handleCollabSubmit = (message: string) => {
    if (collabScent) {
      // 실제 앱에서는 여기서 API 호출을 통해 서버에 협업 제안을 저장할 수 있습니다.
      console.log(
        `Collaboration proposal for "${collabScent.name}": ${message}`
      );

      // 알림 표시
      setNotification({
        message: `Your collaboration proposal for "${collabScent.name}" has been sent!`,
        colorTheme: collabScent.colorTheme,
      });

      // 모달 닫기
      closeCollabModal();

      // 3초 후에 알림 닫기
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <GalleryContainer>
      <HeroSection>
        <GalleryTitle>Gallery Zone</GalleryTitle>
        <GallerySubtitle>
          A Web3-powered marketplace for digital and physical scent works.
          Explore, collaborate, and own unique olfactory NFTs.
        </GallerySubtitle>
      </HeroSection>

      <ContentContainer>
        <CollaborationCards />

        <SectionTitle>Explore Scent Works</SectionTitle>

        <FilterSection>
          <FilterButton
            $active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All Scents
          </FilterButton>
          <FilterButton
            $active={filter === "bottled"}
            onClick={() => setFilter("bottled")}
          >
            Bottled
          </FilterButton>
          <FilterButton
            $active={filter === "ai-only"}
            onClick={() => setFilter("ai-only")}
          >
            AI Only
          </FilterButton>
          <FilterButton
            $active={filter === "collab"}
            onClick={() => setFilter("collab")}
          >
            Collab Ready
          </FilterButton>
        </FilterSection>

        <GalleryGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredScents.map((scent) => (
            <ScentBox
              key={scent.id}
              scent={scent}
              onViewStory={handleViewStory}
              onProposeCollab={handleProposeCollab}
            />
          ))}
        </GalleryGrid>
      </ContentContainer>

      <AnimatePresence>
        {selectedScent && (
          <StoryModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStory}
          >
            <StoryContent
              $colorTheme={selectedScent.colorTheme}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <CloseButton onClick={closeStory}>×</CloseButton>
              <StoryTitle>{selectedScent.name}</StoryTitle>
              <StoryText>{selectedScent.story}</StoryText>
              <StoryCreator>
                Created by
                <CreatorAddress>{selectedScent.creator}</CreatorAddress>
              </StoryCreator>
            </StoryContent>
          </StoryModal>
        )}
      </AnimatePresence>

      {collabScent && (
        <CollabModal
          scent={collabScent}
          onClose={closeCollabModal}
          onSubmit={handleCollabSubmit}
        />
      )}

      <AnimatePresence>
        {notification && (
          <NotificationContainer
            $colorTheme={notification.colorTheme}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <NotificationTitle>Success</NotificationTitle>
            <NotificationMessage>{notification.message}</NotificationMessage>
          </NotificationContainer>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default Web3Gallery;
