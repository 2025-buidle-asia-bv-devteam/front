import React, { useState } from "react";
import styled from "styled-components";
import ScentBox from "./ScentBox";
import CollabModal from "./CollabModal";
import { galleryScents, ScentWork } from "../data/mockGalleryData";

const GalleryContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const GalleryHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const GalleryTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #333;
`;

const GalleryDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background: ${(props) => (props.$active ? "#000" : "transparent")};
  color: ${(props) => (props.$active ? "#fff" : "#333")};
  border: 1px solid #333;
  padding: 0.6rem 1.5rem;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#000" : "#f0f0f0")};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const StoryModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const StoryContent = styled.div<{ $colorTheme: "yellow" | "pink" | "blue" }>`
  background: white;
  padding: 3rem;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  position: relative;
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
`;

const StoryCreator = styled.div`
  font-style: italic;
  margin-top: 2rem;
  color: #666;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #000;
  }
`;

const NotificationContainer = styled.div<{
  $colorTheme: "yellow" | "pink" | "blue";
}>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  animation: slideIn 0.3s ease-out forwards;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const NotificationTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const NotificationMessage = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const ScentGallery: React.FC = () => {
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
          (scent) => !scent.isCollaborative && !scent.hasBottle
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
      <GalleryHeader>
        <GalleryTitle>Gallery Zone</GalleryTitle>
        <GalleryDescription>
          Experience a unique collection of digital and physical scent works.
          Some exist only as AI concepts, others have been bottled, and many are
          open for artistic collaboration.
        </GalleryDescription>
      </GalleryHeader>

      <FilterContainer>
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
      </FilterContainer>

      <GalleryGrid>
        {filteredScents.map((scent) => (
          <ScentBox
            key={scent.id}
            scent={scent}
            onViewStory={handleViewStory}
            onProposeCollab={handleProposeCollab}
          />
        ))}
      </GalleryGrid>

      {selectedScent && (
        <StoryModal onClick={closeStory}>
          <StoryContent
            $colorTheme={selectedScent.colorTheme}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeStory}>×</CloseButton>
            <StoryTitle>{selectedScent.name}</StoryTitle>
            <StoryText>{selectedScent.story}</StoryText>
            <StoryCreator>Created by {selectedScent.creator}</StoryCreator>
          </StoryContent>
        </StoryModal>
      )}

      {collabScent && (
        <CollabModal
          scent={collabScent}
          onClose={closeCollabModal}
          onSubmit={handleCollabSubmit}
        />
      )}

      {notification && (
        <NotificationContainer $colorTheme={notification.colorTheme}>
          <NotificationTitle>Success!</NotificationTitle>
          <NotificationMessage>{notification.message}</NotificationMessage>
        </NotificationContainer>
      )}
    </GalleryContainer>
  );
};

export default ScentGallery;
