import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStory } from "../context/StoryContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: none;
      background: transparent;
      box-shadow: none;
    }
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

const StatusMessage = styled.div<{ $isError?: boolean }>`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.$isError ? 'rgba(255, 59, 48, 0.1)' : 'rgba(52, 199, 89, 0.1)'};
  color: ${(props) => props.$isError ? 'rgba(255, 59, 48, 0.8)' : 'rgba(52, 199, 89, 0.8)'};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const { registerIPAsset, txLoading, txName, client } = useStory();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const validateForm = () => {
    if (!scentName.trim()) {
      setError("Please enter a name for your scent.");
      return false;
    }
    if (!description.trim()) {
      setError("Please enter a description for your scent.");
      return false;
    }
    if (!image) {
      setError("Please upload an image.");
      return false;
    }
    if (!client) {
      setError("Please connect your wallet.");
      return false;
    }
    return true;
  };

  const handlePublish = async () => {
    // Form validation
    if (!validateForm()) return;
    
    setError(null);
    setIsSuccess(false);
    
    try {
      // Register IP asset
      if (image) {
        const result = await registerIPAsset(scentName, description, image);
        
        if (result) {
          setIsSuccess(true);
          // Redirect to home after 3 seconds
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setError("Failed to register IP asset.");
        }
      }
    } catch (err) {
      console.error("Error during IP registration:", err);
      setError("An error occurred during registration. Please check the console for details.");
    }
  };

  return (
    <StudioContainer>
      <HeaderSection>
        <div>
          <StudioTitle initial="hidden" animate="visible" variants={fadeIn}>
            Publish Your Scent
          </StudioTitle>
          <StudioSubtitle initial="hidden" animate="visible" variants={fadeIn}>
            Register your scent IP through Story Protocol and store it permanently on the blockchain.
          </StudioSubtitle>
        </div>
        <ConnectButton />
      </HeaderSection>

      <StudioContent>
        <InfoSection style={{ flex: 1 }}>
          <SectionTitle>Scent Information</SectionTitle>

          {txLoading && (
            <StatusMessage>
              {txName}... In progress. Please wait.
            </StatusMessage>
          )}

          {isSuccess && (
            <StatusMessage>
              Successfully registered your scent IP! Redirecting to home page shortly.
            </StatusMessage>
          )}

          {error && (
            <StatusMessage $isError>
              {error}
            </StatusMessage>
          )}

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
              placeholder="Ex: Smoky Rose"
              value={scentName}
              onChange={(e) => setScentName(e.target.value)}
            />
          </ImagePanel>

          <ImagePanel>
            <PanelTitle>Scent Story</PanelTitle>
            <textarea
              placeholder="Describe the emotions, mood, and story behind this scent..."
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
        <MintButton 
          whileHover={{ y: -3 }} 
          whileTap={{ scale: 0.98 }} 
          onClick={handlePublish}
          disabled={txLoading}
        >
          {txLoading ? "Registering..." : "Register IP"}
        </MintButton>
      </FooterSection>
    </StudioContainer>
  );
};

export default ScentPublish;
