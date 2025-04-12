import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StudioContainer = styled.div`
  width: 100%;
  padding: 70px 0;
  display: flex;
  flex-direction: column;
  background-color: #0f0f0f;
  color: #f0f0f0;
  position: relative;
`;

const HeaderSection = styled.div`
  width: 100%;
  padding: 2rem 0;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const StudioTitle = styled(motion.h1)`
  font-size: 2.2rem;
  font-weight: 300;
  color: #f0f0f0;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
`;

const StudioSubtitle = styled(motion.p)`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
`;

const StudioContent = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 200px);
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  color: #f0f0f0;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.07);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const InfoSection = styled.div`
  flex: 0 0 40%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 300;
  color: #f0f0f0;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
`;

const ImagePanel = styled(motion.div)`
  margin-bottom: 5rem;
`;

const PanelTitle = styled.h3`
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
`;

const FooterSection = styled.div`
  width: 100%;
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
`;

const MintButton = styled(motion.button)`
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid rgba(146, 132, 122, 0.5);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  font-size: 1rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(146, 132, 122, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const UploadButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid rgba(146, 132, 122, 0.5);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  font-size: 0.7rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
`;


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};


const ScentPublish: React.FC = () => {
  const navigate = useNavigate();
  const [scentName, setScentName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleNext = () => {
    // 여기에 scentName, description, image 등을 서버로 보낼 수도 있음
    navigate("/");
  };

  return (
    <StudioContainer>
      <HeaderSection>
        <StudioTitle initial="hidden" animate="visible" variants={fadeIn}>
          Publish Your Scent
        </StudioTitle>
        <StudioSubtitle initial="hidden" animate="visible" variants={fadeIn}>
          Describe your unique fragrance before stepping into the Story World.
        </StudioSubtitle>
      </HeaderSection>

      <StudioContent>
        <InfoSection style={{ flex: 1 }}>
          <SectionTitle>Scent Details</SectionTitle>

          <ImagePanel>
            <PanelTitle>Upload Image</PanelTitle>
            <label htmlFor="file-upload">
              <UploadButton as="span" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                Choose File
              </UploadButton>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {preview && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "100%", maxWidth: 150, borderRadius: "1rem" }}
                />
              </div>
            )}
          </ImagePanel>

          <ImagePanel>
            <PanelTitle>Scent Name</PanelTitle>
            <ChatInput
              type="text"
              placeholder="e.g. Smoky Rose"
              value={scentName}
              onChange={(e) => setScentName(e.target.value)}
            />
          </ImagePanel>

          <ImagePanel>
            <PanelTitle>Scent Story</PanelTitle>
            <textarea
              placeholder="Describe the feeling, mood, and story behind this scent..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                minHeight: "120px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "1rem",
                color: "#f0f0f0",
                padding: "1rem",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
          </ImagePanel>
        </InfoSection>
      </StudioContent>

      <FooterSection>
        <MintButton whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} onClick={handleNext}>
          Publish
        </MintButton>
      </FooterSection>
    </StudioContainer>
  );
};


export default ScentPublish;
