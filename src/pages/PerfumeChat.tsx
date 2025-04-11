import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useWallet } from '../context/WalletContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
  max-width: 1200px;
  margin: 70px auto 0;
  padding: 2rem;
  background-color: rgba(10, 10, 10, 0.8);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: calc(100vh - 100px);
    padding: 1rem;
    margin-top: 60px;
  }
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const AgentAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  font-size: 1.5rem;
  color: white;
`;

const AgentInfo = styled.div`
  flex: 1;
`;

const AgentName = styled.h2`
  font-size: 1.5rem;
  color: var(--primary);
  margin: 0;
`;

const AgentStatus = styled.p`
  font-size: 0.9rem;
  color: #999;
  margin: 0;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 10px;
  }
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 1rem;
  border-radius: 15px;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.isUser ? 'var(--gradient)' : 'rgba(255, 255, 255, 0.1)'};
  position: relative;
  word-break: break-word;
`;

const MessageTime = styled.div<{ isUser: boolean }>`
  font-size: 0.7rem;
  color: ${props => props.isUser ? 'rgba(255, 255, 255, 0.7)' : '#999'};
  position: absolute;
  bottom: -20px;
  ${props => props.isUser ? 'right: 10px;' : 'left: 10px;'}
`;

const InputArea = styled.form`
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const TextInput = styled.input`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 30px;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary);
  }
`;

const SendButton = styled.button`
  background: var(--gradient);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    background: #333;
    cursor: not-allowed;
  }
`;

const ConnectPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
`;

const ConnectButton = styled.button`
  background: var(--gradient);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4);
  }
`;

// 메시지 시간 포맷팅 함수
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const PerfumeChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '안녕하세요! 저는 당신의 취향에 맞는 향수를 찾아주는 퍼퓸 AI 에이전트입니다. 어떤 향수를 찾고 계신가요?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { account, connectWallet } = useWallet();

  // 메시지 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // 실제 API 호출은 여기에 구현
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };

  // 임시로 AI 응답을 생성하는 함수 (실제로는 백엔드 API로 대체)
  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('추천') || lowerMessage.includes('어떤 향수')) {
      return '취향에 맞는 향수를 추천해드리기 위해 몇 가지 질문을 드릴게요. 어떤 분위기의 향수를 찾으시나요? 상쾌한, 달콤한, 우디한, 또는 플로럴한 향을 좋아하시나요?';
    }
    
    if (lowerMessage.includes('상쾌한') || lowerMessage.includes('시트러스')) {
      return '상쾌한 시트러스 계열이라면 "아쿠아 디 파르마 - 아란치아 디 카프리"나 "조 말론 - 라임 바질 앤 만다린"을 추천드립니다. 이 향수들은 레몬, 라임, 베르가못 등의 산뜻한 향이 특징이에요.';
    }
    
    if (lowerMessage.includes('달콤한') || lowerMessage.includes('바닐라')) {
      return '달콤한 향이라면 "입생로랑 - 블랙 오피움"이나 "딥티크 - 오 뒤엘"을 고려해보세요. 바닐라, 카라멜, 벤조인 같은 달콤한 노트가 풍부하게 느껴집니다.';
    }
    
    if (lowerMessage.includes('우디') || lowerMessage.includes('샌달우드')) {
      return '우디한 향이라면 "르 라보 - 상탈 33"이나 "톰 포드 - 우드 우드"가 훌륭한 선택이 될 수 있습니다. 샌달우드, 시더우드, 베티버 등의 깊고 따뜻한 우드 노트가 특징입니다.';
    }
    
    if (lowerMessage.includes('플로럴') || lowerMessage.includes('꽃')) {
      return '플로럴 계열이라면 "디올 - 미스 디올 블루밍 부케"나 "샤넬 - 가브리엘"을 추천합니다. 자스민, 로즈, 튜베로즈 등 다양한 꽃 향이 조화롭게 어우러집니다.';
    }
    
    return '더 자세한 취향을 알려주시면 더 정확한 향수를 추천해드릴 수 있어요. 어떤 종류의 향을 선호하시나요? 또는 평소에 좋아하는 향이나 분위기가 있으신가요?';
  };

  if (!account) {
    return (
      <ChatContainer>
        <ConnectPrompt>
          <h2>향수 AI 에이전트와 대화하려면 지갑 연결이 필요합니다</h2>
          <p>지갑을 연결하시면 AI 에이전트와 대화하여 나만의 향수를 찾을 수 있습니다.</p>
          <ConnectButton onClick={connectWallet}>지갑 연결하기</ConnectButton>
        </ConnectPrompt>
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <AgentAvatar>🧪</AgentAvatar>
        <AgentInfo>
          <AgentName>퍼퓸 AI 에이전트</AgentName>
          <AgentStatus>항상 활성화됨</AgentStatus>
        </AgentInfo>
      </ChatHeader>

      <ChatMessages>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} isUser={msg.sender === 'user'}>
            {msg.text}
            <MessageTime isUser={msg.sender === 'user'}>
              {formatTime(msg.timestamp)}
            </MessageTime>
          </MessageBubble>
        ))}
        {loading && (
          <MessageBubble isUser={false}>
            <div>생각 중...</div>
          </MessageBubble>
        )}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <InputArea onSubmit={handleSendMessage}>
        <TextInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력..."
          disabled={loading}
        />
        <SendButton type="submit" disabled={loading || !input.trim()}>
          ➤
        </SendButton>
      </InputArea>
    </ChatContainer>
  );
};

export default PerfumeChat; 