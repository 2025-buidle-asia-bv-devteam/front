import React, { useState } from "react";
import styled from "styled-components";
import { ScentWork } from "../data/mockGalleryData";

interface CollabModalProps {
  scent: ScentWork;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div<{ $colorTheme: "yellow" | "pink" | "blue" }>`
  background: white;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: ${(props) => {
      const colors = {
        yellow: "rgba(146, 132, 122, 0.9)",
        pink: "rgba(104, 96, 90, 0.9)",
        blue: "rgba(171, 160, 152, 0.9)",
      };
      return colors[props.$colorTheme];
    }};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

const ModalTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ScentInfo = styled.div`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.3rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{
  $primary?: boolean;
  $colorTheme: "yellow" | "pink" | "blue";
}>`
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${(props) =>
    props.$primary
      ? (() => {
          const colors = {
            yellow: "rgba(146, 132, 122, 0.9)",
            pink: "rgba(104, 96, 90, 0.9)",
            blue: "rgba(171, 160, 152, 0.9)",
          };
          return colors[props.$colorTheme];
        })()
      : "transparent"};

  color: ${(props) => (props.$primary ? "#fff" : "#333")};
  border: 1px solid ${(props) => (props.$primary ? "transparent" : "#ddd")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
  }
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

const CollabModal: React.FC<CollabModalProps> = ({
  scent,
  onClose,
  onSubmit,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent
        $colorTheme={scent.colorTheme}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>×</CloseButton>

        <ModalTitle>Propose Collaboration</ModalTitle>

        <ScentInfo>
          <h3>{scent.name}</h3>
          <p>Created by {scent.creator}</p>
        </ScentInfo>

        <Form onSubmit={handleSubmit}>
          <TextAreaWrapper>
            <Label htmlFor="collab-message">Your Message</Label>
            <TextArea
              id="collab-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your collaboration idea or how you'd like to contribute to this scent work..."
              required
            />
          </TextAreaWrapper>

          <ButtonsContainer>
            <Button
              type="button"
              $colorTheme={scent.colorTheme}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" $primary $colorTheme={scent.colorTheme}>
              Send Proposal
            </Button>
          </ButtonsContainer>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CollabModal;
