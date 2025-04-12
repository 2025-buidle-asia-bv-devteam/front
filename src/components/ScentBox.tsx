import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ScentWork } from "../data/mockGalleryData";

interface ScentBoxProps {
  scent: ScentWork;
  onViewStory: (scent: ScentWork) => void;
  onProposeCollab: (scent: ScentWork) => void;
}

// 조향 상태에 따른 색상 맵핑
const getThemeColor = (theme: "yellow" | "pink" | "blue") => {
  const colors = {
    yellow: {
      primary: "rgba(146, 132, 122, 0.9)",
      secondary: "rgba(146, 132, 122, 0.15)",
      border: "rgba(146, 132, 122, 0.5)",
      text: "#5d534b",
    },
    pink: {
      primary: "rgba(104, 96, 90, 0.9)",
      secondary: "rgba(104, 96, 90, 0.15)",
      border: "rgba(104, 96, 90, 0.5)",
      text: "#3a3631",
    },
    blue: {
      primary: "rgba(171, 160, 152, 0.9)",
      secondary: "rgba(171, 160, 152, 0.15)",
      border: "rgba(171, 160, 152, 0.5)",
      text: "#635a52",
    },
  };

  return colors[theme];
};

const BoxContainer = styled(motion.div)`
  position: relative;
  background: rgba(20, 20, 30, 0.6);
  border-radius: 12px;
  overflow: hidden;
  min-height: 300px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const ScentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${BoxContainer}:hover & {
    transform: scale(1.05);
  }
`;

const StatusBadge = styled.div<{ status: string }>`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  z-index: 2;
  background: ${(props) => {
    switch (props.status) {
      case "bottled":
        return "rgba(0, 200, 83, 0.9)";
      case "ai-only":
        return "rgba(66, 133, 244, 0.9)";
      case "collaborative":
        return "rgba(255, 145, 0, 0.9)";
      default:
        return "rgba(100, 100, 100, 0.9)";
    }
  }};
  color: white;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
`;

const ContentContainer = styled.div`
  padding: 20px;
`;

const ScentName = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
  color: #ffffff;
  font-weight: 600;
`;

const Creator = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 15px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled(motion.button)<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.primary
      ? "linear-gradient(45deg, #6e46ff, #9166ff)"
      : "rgba(255, 255, 255, 0.1)"};
  color: white;
  border: ${(props) =>
    props.primary ? "none" : "1px solid rgba(255, 255, 255, 0.2)"};

  &:hover {
    background: ${(props) =>
      props.primary
        ? "linear-gradient(45deg, #8057ff, #a57aff)"
        : "rgba(255, 255, 255, 0.2)"};
    transform: translateY(-2px);
  }
`;

const CollabIndicator = styled.div<{ isCollab: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: ${(props) =>
    props.isCollab ? "#FFD700" : "rgba(255, 255, 255, 0.6)"};
`;

const CollabIcon = styled.span`
  font-size: 14px;
  margin-right: 8px;
`;

const getStatusText = (
  status: string,
  hasBottle: boolean,
  isCollaborative: boolean
): string => {
  if (status === "bottled" && hasBottle) {
    return "Bottled";
  } else if (status === "ai-only") {
    return "AI-only";
  } else if (isCollaborative) {
    return "Collaborative";
  } else {
    return "Digital";
  }
};

const ScentBox: React.FC<ScentBoxProps> = ({
  scent,
  onViewStory,
  onProposeCollab,
}) => {
  const statusText = getStatusText(
    scent.status,
    scent.hasBottle,
    scent.isCollaborative
  );

  return (
    <BoxContainer whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <StatusBadge status={scent.status}>{statusText}</StatusBadge>

      <ImageContainer>
        <ScentImage src={scent.imageUrl} alt={scent.name} />
      </ImageContainer>

      <ContentContainer>
        <ScentName>{scent.name}</ScentName>
        <Creator>by {scent.creator}</Creator>

        <CollabIndicator isCollab={scent.isCollaborative}>
          <CollabIcon>{scent.isCollaborative ? "✦" : "◇"}</CollabIcon>
          {scent.isCollaborative
            ? "Collaborative Project"
            : "Individual Creation"}
        </CollabIndicator>

        <ButtonContainer>
          <ActionButton
            primary
            onClick={() => onViewStory(scent)}
            whileTap={{ scale: 0.97 }}
          >
            View Story
          </ActionButton>

          {!scent.isCollaborative && (
            <ActionButton
              onClick={() => onProposeCollab(scent)}
              whileTap={{ scale: 0.97 }}
            >
              Propose Collab
            </ActionButton>
          )}
        </ButtonContainer>
      </ContentContainer>
    </BoxContainer>
  );
};

export default ScentBox;
