import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import firstImg from "../assets/image/first.png";
import secondImg from "../assets/image/second.png";
import thirdImg from "../assets/image/third.png";
import fourthImg from "../assets/image/fourth.png";
// fourth.png 이미지가 있다면 적용하고, 없다면 URL 이미지 사용
// 이미지가 있는지 확인하는 방법은 React에서 다양하게 시도할 수 있습니다.
// 여기서는 fourthImg 변수를 사용하여 URL 이미지를 대체용으로 설정합니다.

// 향기 데이터 타입 정의
interface Perfume {
  id: string;
  name: string;
  subtitle?: string;
  story: string;
  price: string;
  tags: string[];
  creator: string;
  image: string;
}

// 스크롤 프로그레스 바
const ScrollProgress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(to right, #92847a, #c2b5a9);
  z-index: 1000;
`;

// 섹션 컴포넌트
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
`;

const IntroSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
`;

const SliderSection = styled.div`
  width: 100%;
  min-height: 90vh;
  padding: 2rem 0 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 1rem;
`;

// 페이드인 애니메이션 변수
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SectionTitle = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 400;
  color: #000000;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }
`;

const SubTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 300;
  color: #000000;
  letter-spacing: -0.01em;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ScrollPrompt = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  opacity: 0.5;
  animation: fadeInOut 2s infinite;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    opacity: 1;
    transform: translateY(5px);
  }

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

const ScrollIcon = styled.div`
  width: 30px;
  height: 50px;
  border: 2px solid #000;
  border-radius: 25px;
  position: relative;
  margin-bottom: 0.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    width: 4px;
    height: 8px;
    background: #000;
    margin-left: -2px;
    border-radius: 2px;
    animation: scrollDown 2s infinite;
  }

  @keyframes scrollDown {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(10px);
      opacity: 0.3;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ScrollText = styled.p`
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

// 슬라이더 컨테이너
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 70vh;
  margin-bottom: 1rem;
`;

const SlidesWrapper = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Slide = styled(motion.div)`
  flex: 0 0 100%;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(300px, 0.8fr) 1.2fr;
  gap: 2rem;
  padding: 1rem 5% 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem 5% 2rem;
  }
`;

const PerfumeImageWrapper = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem;
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  max-width: 90%;
  aspect-ratio: 3/4; // 이미지 비율 유지
  border-radius: 4px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease;
  overflow: hidden;
  margin: 0 auto; // 중앙 정렬

  &:hover {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    max-width: 85%;
    aspect-ratio: 3/4;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  transition: transform 1.5s ease;
`;

const PerfumeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1rem 2rem 1rem 0;
  overflow-y: auto;
  max-height: 70vh;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    max-height: none;
  }
`;

// 콘텐츠 영역 최소 높이 설정을 위한 컴포넌트
const ContentArea = styled.div`
  flex: 1;
  min-height: 180px; /* 최소 높이 설정 */
  display: flex;
  flex-direction: column;
`;

const MetaArea = styled.div`
  margin-top: auto;
`;

const PerfumeName = styled(motion.h2)`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 3rem;
  font-weight: 400;
  color: #000;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
`;

const PerfumeSubtitle = styled(motion.h3)`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.2rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
  line-height: 1.5;
`;

const PerfumeStory = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #333;
  opacity: 0.9;
  margin-bottom: 2rem;
  white-space: pre-wrap;

  /* 문단 사이의 간격만 유지 */
  br + br {
    display: none;
  }

  /* 연속된 줄바꿈 하나만 표시 */
  br {
    line-height: 2;
  }
`;

const PerfumePrice = styled(motion.div)`
  font-size: 1.4rem;
  font-weight: 400;
  color: #92847a;
  margin-bottom: 2rem;
`;

const TagsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const Tag = styled(motion.span)`
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  font-size: 0.9rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CreatorInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const CreatorLabel = styled.span`
  color: #333;
  opacity: 0.7;
  margin-right: 0.5rem;
`;

const CreatorAddress = styled.span`
  font-family: monospace;
  color: #92847a;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

const Button = styled(motion(Link))`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease;
  }

  &:hover {
    background: #000;
    color: #fff;
  }

  &:hover::after {
    width: 100%;
  }
`;

// 네비게이션 버튼
const NavButton = styled.button<{
  $direction: "left" | "right";
  $disabled?: boolean;
}>`
  position: absolute;
  top: 45%;
  ${(props) => (props.$direction === "left" ? "left: 1rem;" : "right: 1rem;")}
  transform: translateY(-50%);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: ${(props) =>
    props.$disabled ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.1)"};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  z-index: 10;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  
  @media (max-width: 768px) {
    top: auto;
    bottom: -2rem;
    ${(props) => (props.$direction === "left" ? "left: 30%;" : "right: 30%;")}
  }

  &:hover {
    background: ${(props) =>
      props.$disabled ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.2)"};
    transform: ${(props) =>
      props.$disabled ? "translateY(-50%)" : "translateY(-50%) scale(1.1)"};
  }

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    border-style: solid;
    border-width: 0 2px 2px 0;
    transform: ${(props) =>
      props.$direction === "left" ? "rotate(135deg)" : "rotate(-45deg)"};
    display: inline-block;
    margin-${(props) =>
      props.$direction === "left" ? "right" : "left"}: 0.2rem;
  }
`;

// 슬라이드 인디케이터
const SlideIndicators = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Indicator = styled(motion.div)<{ $active: boolean }>`
  width: ${(props) => (props.$active ? "2rem" : "0.8rem")};
  height: 0.8rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.$active ? "#000" : "rgba(0, 0, 0, 0.2)"};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "#000" : "rgba(0, 0, 0, 0.4)"};
    transform: scale(1.1);
  }
`;

// More 버튼 스타일 수정
const MoreScentButton = styled(motion(Link))`
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  margin: 4rem auto 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease;
  }

  &:hover {
    background: #000;
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &:hover::after {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

// 메인 ScentMarket 컴포넌트
const ScentMarket: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = usePrivy();
  const slidesRef = useRef<HTMLDivElement>(null);
  const sliderSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // 스크롤 프로그레스 추적
  useEffect(() => {
    const updateScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // 초기 데이터 로드
  useEffect(() => {
    // API 호출 대신 예시 데이터 사용
    const mockPerfumes: Perfume[] = [
      {
        id: "1",
        name: "Her Aura Was Not Meant to Stay",
        story:
          "She left that night without closing the door.\nOnly her scent remained on the sheets. You may own this feeling—\nbut you'll never understand it. She lives only in my memory.",
        price: "0.35 ETH",
        tags: ["Midnight", "Haunting", "Bold", "Mysterious"],
        creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        image: firstImg,
      },
      {
        id: "2",
        name: "The Scent She Wore",
        subtitle:
          "And I remember her, not as my mother, but as a woman in love.",
        story:
          "She wore the same scent every day.\nI only saw my mother—never the woman she was.\nBut years later, wearing that perfume myself, I finally understood what she longed for.",
        price: "0.28 ETH",
        tags: ["Nostalgia", "Tuberose", "Maternal", "Longing"],
        creator: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        image: secondImg,
      },
      {
        id: "3",
        name: "To My X",
        story: "I couldn't let you go,\nso I sealed you in a scent.",
        price: "0.42 ETH",
        tags: ["Forest", "Woody", "Moss", "Heartache"],
        creator: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        image: thirdImg,
      },
      {
        id: "4",
        name: "The Scent We Left in the Dirt",
        subtitle:
          "Before we grew up. Before we were husbands. We were wild. There was a time",
        story:
          "when all we needed was a Jeep, two tents,\nand a bottle that smelled like smoke and pine.\nWe weren't fathers then—just boys chasing the edge of freedom,",
        price: "0.38 ETH",
        tags: ["Freedom", "Earth", "Forest", "Untamed"],
        creator: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        image: fourthImg,
      },
    ];

    setPerfumes(mockPerfumes);
  }, []);

  // 스크롤 핸들러 - 슬라이더 섹션으로 스크롤
  const scrollToSlider = () => {
    sliderSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 지갑 주소 포맷
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  // 슬라이드 변경 핸들러
  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < perfumes.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    setActiveTag(activeTag === tag ? null : tag);
    // 여기에 해당 태그의 필터링 로직 추가 가능
    console.log(`Selected tag: ${tag}`);
  };

  if (perfumes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Section>
      <ScrollProgress style={{ width: `${scrollProgress}%` }} />

      <IntroSection>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <SectionTitle variants={item}>SCENTED STORIES</SectionTitle>
          <SubTitle variants={item}>Own the scent, own the story.</SubTitle>
          <ScrollPrompt
            onClick={scrollToSlider}
            variants={item}
            whileHover={{ y: 5, opacity: 1 }}
          >
            <ScrollIcon />
            <ScrollText>Scroll to explore</ScrollText>
          </ScrollPrompt>
        </motion.div>
      </IntroSection>

      <SliderSection ref={sliderSectionRef}>
        <Container>
          <SliderContainer>
            <SlidesWrapper
              ref={slidesRef}
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {perfumes.map((perfume) => (
                <Slide key={perfume.id}>
                  <PerfumeImageWrapper
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <ImageContainer
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StyledImage src={perfume.image} alt={perfume.name} />
                    </ImageContainer>
                  </PerfumeImageWrapper>

                  <PerfumeInfo>
                    <ContentArea>
                      <PerfumeName
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {perfume.name}
                      </PerfumeName>

                      {perfume.subtitle && (
                        <PerfumeSubtitle
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                        >
                          {perfume.subtitle}
                        </PerfumeSubtitle>
                      )}

                      <PerfumeStory
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {perfume.story}
                      </PerfumeStory>
                    </ContentArea>

                    <MetaArea>
                      <PerfumePrice
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {perfume.price}
                      </PerfumePrice>

                      <TagsContainer
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {perfume.tags.map((tag, idx) => (
                          <Tag
                            key={idx}
                            onClick={() => handleTagClick(tag)}
                            whileHover={{
                              y: -3,
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                            }}
                            whileTap={{ y: 0 }}
                            style={{
                              backgroundColor:
                                activeTag === tag
                                  ? "rgba(0, 0, 0, 0.2)"
                                  : "rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            #{tag}
                          </Tag>
                        ))}
                      </TagsContainer>

                      <CreatorInfo
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <CreatorLabel>Creator:</CreatorLabel>
                        <CreatorAddress>
                          {user?.wallet?.address
                            ? formatAddress(user.wallet.address)
                            : formatAddress(perfume.creator)}
                        </CreatorAddress>
                      </CreatorInfo>

                      <Button
                        to={`/marketplace/${perfume.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{
                          backgroundColor: "#000",
                          color: "#fff",
                          y: -5,
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Collect This Scent
                      </Button>
                    </MetaArea>
                  </PerfumeInfo>
                </Slide>
              ))}
            </SlidesWrapper>

            <NavButton
              $direction="left"
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              $disabled={currentSlide === 0}
            />
            <NavButton
              $direction="right"
              onClick={handleNextSlide}
              disabled={currentSlide === perfumes.length - 1}
              $disabled={currentSlide === perfumes.length - 1}
            />
          </SliderContainer>

          <SlideIndicators>
            {perfumes.map((_, index) => (
              <Indicator
                key={index}
                $active={currentSlide === index}
                onClick={() => handleIndicatorClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </SlideIndicators>

          <ButtonContainer>
            <MoreScentButton
              to="/scents/all"
              whileHover={{
                y: -5,
                backgroundColor: "#000",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ y: 0 }}
            >
              MORE SCENTS
            </MoreScentButton>
          </ButtonContainer>
        </Container>
      </SliderSection>
    </Section>
  );
};

export default ScentMarket;
