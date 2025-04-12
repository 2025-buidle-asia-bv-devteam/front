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

const ChatSection = styled.div`
  flex: 0 0 60%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ChatMessage = styled(motion.div)<{ $isUser: boolean }>`
  display: flex;
  margin-bottom: 2rem;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  width: 100%;
`;

const InputArea = styled.div`
  display: flex;
  margin-top: 1rem;
  position: relative;
  align-items: center;
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

const SendButton = styled.button`
  position: absolute;
  right: 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
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

const IngredientPanel = styled(motion.div)`
  margin-bottom: 2rem;
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

const IngredientList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const MoodTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 3rem;
`;

// logo
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240px;
  margin-top: 1rem;
  perspective: 1000px;
`;

const LogoImage = styled.img<{ isLoading: boolean }>`
  width: 160px;
  height: 160px;
  object-fit: contain;
  transform-style: preserve-3d;
  ${({ isLoading }) =>
    isLoading &&
    `
    animation: spin3D 2s linear infinite;
  `}

  @keyframes spin3D {
    0% {
      transform: rotateY(0deg) rotateX(0deg);
    }
    100% {
      transform: rotateY(360deg) rotateX(360deg);
    }
  }
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

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
`;

const Pulse = styled.div`
  width: 10px;
  height: 10px;
  background-color: #92847a;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
`;

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const messageAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const ScentStudio: React.FC = () => {
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isUser: true }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/chat", {
        message: input,
      });

      const agentReply = res.data.message || "No response from agent.";

      setMessages([...newMessages, { text: agentReply, isUser: false }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { text: "⚠️ Failed to connect to agent.", isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // enterkey
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  // auto scroll
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <StudioContainer>
      <HeaderSection>
        <StudioTitle initial="hidden" animate="visible" variants={fadeIn}>
          Ready to be a Perfumer?
        </StudioTitle>
        <StudioSubtitle initial="hidden" animate="visible" variants={fadeIn}>
          Let's deep-dive into the Scentaverse!
        </StudioSubtitle>
      </HeaderSection>

      <StudioContent>
        <ChatSection>
          <SectionTitle>Blend anything you want</SectionTitle>

          <ChatArea ref={chatAreaRef}>
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                $isUser={msg.isUser}
                initial="hidden"
                animate="visible"
                variants={messageAnimation}
              >
                <div>{msg.text}</div>
              </ChatMessage>
            ))}
          </ChatArea>

          <InputArea>
            <ChatInput
              type="text"
              placeholder="ex) Want some cooool scent such as mixing smoky and woody aroma"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SendButton onClick={sendMessage}>
              <span role="img" aria-label="send">
                ➤
              </span>
            </SendButton>
          </InputArea>
        </ChatSection>

        <InfoSection>
          <SectionTitle>Perfume ingredients</SectionTitle>

          <IngredientPanel>
            <PanelTitle>Selected ingredients</PanelTitle>
            <IngredientList>
              <div
                style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}
              >
                No ingredients has been selected yet
              </div>
            </IngredientList>

            <PanelTitle>Tags</PanelTitle>
            <MoodTagList>
              <div
                style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}
              >
                No tags has been selected yet
              </div>
            </MoodTagList>

            {isLoading && (
              <StatusIndicator>
                <Pulse />
                <span>Blending...</span>
              </StatusIndicator>
            )}

            <LogoContainer>
              <LogoImage
                src="/logo22.png"
                alt="Rotating Logo"
                isLoading={isLoading}
              />
            </LogoContainer>
          </IngredientPanel>
        </InfoSection>
      </StudioContent>

      <FooterSection>
        <MintButton
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/scentimagestudio")}
        >
          Next Step
        </MintButton>
      </FooterSection>
    </StudioContainer>
  );
};

export default ScentStudio;
