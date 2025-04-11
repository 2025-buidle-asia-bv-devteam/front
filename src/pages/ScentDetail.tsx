import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import firstImg from "../assets/image/first.png";
import secondImg from "../assets/image/second.png";
import thirdImg from "../assets/image/third.png";
import fourthImg from "../assets/image/fourth.png";

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
  derivatives: Derivative[];
}

interface Derivative {
  id: string;
  name: string;
  type: string;
  image: string;
}

interface Recommendation {
  id: string;
  name: string;
  description: string;
  image: string;
}

// 섹션 컴포넌트
const Section = styled.section<{ $bgColor?: string }>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 2rem;
  background-color: ${(props) => props.$bgColor || "#ffffff"};
  overflow: hidden;
  transition: background-color 0.5s ease;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const SectionTitle = styled.h1<{ $dark?: boolean }>`
  font-size: 3.5rem;
  font-weight: 300;
  color: ${(props) => (props.$dark ? "#ffffff" : "#000000")};
  letter-spacing: 3px;
  margin-bottom: 8rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 5rem;
  }
`;

// 향기 카드 컴포넌트
const PerfumeCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  padding: 3rem 1rem;
  background: #ffffff;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 0;
  }
`;

const PerfumeImageWrapper = styled.div`
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease;
  position: relative;
  max-width: 500px;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
  border-radius: 2px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.02);
    pointer-events: none;
    transition: background-color 0.5s ease;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  transition: transform 1.5s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImageTitle = styled.h2`
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
  text-align: center;
  font-family: "Playfair Display", Georgia, serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #000;
  z-index: 2;
`;

const ImageSubtitle = styled.p`
  position: absolute;
  top: calc(20% + 3rem);
  left: 0;
  width: 100%;
  text-align: center;
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  z-index: 2;
`;

const PerfumeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
`;

const PerfumeName = styled.h2`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 2.8rem;
  font-weight: 300;
  color: #000;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  line-height: 1.2;
`;

const PerfumeSubtitle = styled.h3`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.3rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 2.5rem;
`;

const PerfumeStory = styled.p`
  font-size: 1.2rem;
  line-height: 1.9;
  color: #333;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  white-space: pre-line;
`;

const PerfumePrice = styled.div`
  font-size: 1.4rem;
  font-weight: 400;
  color: #92847a;
  margin-bottom: 2rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
`;

const Tag = styled.span`
  padding: 0.7rem 1.4rem;
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
`;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
`;

const CreatorLabel = styled.span`
  font-size: 0.95rem;
  color: #333;
  opacity: 0.7;
  margin-right: 1rem;
`;

const CreatorAddress = styled.span`
  font-weight: 500;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 1rem 3rem;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  text-transform: uppercase;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

// 파생 상품 컴포넌트
const DerivativesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const DerivativeCard = styled.div`
  background: #111;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }
`;

const DerivativeImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: transform 0.8s ease;
  }

  ${DerivativeCard}:hover & img {
    transform: scale(1.08);
  }
`;

const DerivativeInfo = styled.div`
  padding: 1.8rem;

  h4 {
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

// 추천 향기 컴포넌트
const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RecommendationCard = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.4s ease;
    z-index: 1;
  }

  &:hover:after {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const RecommendationImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: transform 0.8s ease;
  }

  ${RecommendationCard}:hover & img {
    transform: scale(1.08);
  }
`;

const RecommendationOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1.5rem;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 2;

  h4 {
    font-size: 1.3rem;
    font-weight: 400;
    color: #000;
    margin-bottom: 0.8rem;
  }

  p {
    font-size: 0.95rem;
    color: #333;
    opacity: 0.9;
  }
`;

// 메인 ScentDetail 컴포넌트
const ScentDetail: React.FC = () => {
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const { id } = useParams<{ id: string }>();
  const { user } = usePrivy();

  console.log("Detail page ID:", id); // 디버깅용 로그

  // 초기 데이터 로드
  useEffect(() => {
    // 실제 id값을 사용 (없으면 "1"로 기본값 지정)
    const perfumeId = id || "1";
    let mockPerfume: Perfume;

    if (perfumeId === "2") {
      // 두 번째 향수 데이터 (To My Memory by the Sea)
      mockPerfume = {
        id: "2",
        name: "To My Memory by the Sea",
        subtitle: "그날의 바람은, 튜베로즈처럼 잔잔하게 나를 안아줬어.",
        story:
          "고요한 해변의 기억. 파도는 밀려오고 잔잔히 사라지듯, 네가 남긴 향이 아직도 맴돌아. 소금기 묻은 바람과 함께 피어나는 튜베로즈 향이 어린 시절의 추억을 끄집어내. 지금은 돌아갈 수 없는 시간, 하지만 향기만은 여전히 선명해.",
        price: "0.28 ETH",
        tags: ["추억", "튜베로즈", "고요함", "맑음", "그리움"],
        creator: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        image: secondImg,
        derivatives: [
          {
            id: "d1",
            name: "Sea Memory",
            type: "디퓨저",
            image:
              "https://images.unsplash.com/photo-1616604426994-4e95577d5567?q=80&w=1470&auto=format&fit=crop",
          },
          {
            id: "d2",
            name: "Tuberose Bath",
            type: "비누",
            image:
              "https://images.unsplash.com/photo-1602414220083-671f659a7f62?q=80&w=1471&auto=format&fit=crop",
          },
          {
            id: "d3",
            name: "Calm Wave",
            type: "룸스프레이",
            image:
              "https://images.unsplash.com/photo-1488381397757-59d6261610f4?q=80&w=1528&auto=format&fit=crop",
          },
          {
            id: "d4",
            name: "Memory Candle",
            type: "캔들",
            image:
              "https://images.unsplash.com/photo-1574944985070-8afaeb80b7ed?q=80&w=1374&auto=format&fit=crop",
          },
        ],
      };
    } else if (perfumeId === "4") {
      // 네 번째 향수 데이터 (To My Untamed Hours)
      mockPerfume = {
        id: "4",
        name: "To My Untamed Hours",
        subtitle: "숲의 향, 낙엽 위의 발자국, 어딘가를 향했던 나의 발끝.",
        story:
          "길들여지지 않은 시간 속에서 만난 자유로운 영혼. 젖은 흙냄새와 숲의 그늘이 만들어낸 몽환적 낭만이 공기 중에 흩어진다. 머물지 않았기에 더 강렬했던 시간의 냄새. 아무도 가두지 못한 순간, 향기만이 그 흔적을 기억한다.",
        price: "0.38 ETH",
        tags: ["자유", "흙", "숲", "낭만"],
        creator: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        image: fourthImg,
        derivatives: [
          {
            id: "d1",
            name: "Forest Echo",
            type: "디퓨저",
            image:
              "https://images.unsplash.com/photo-1473773386757-42bbe7288ce4?q=80&w=1470&auto=format&fit=crop",
          },
          {
            id: "d2",
            name: "Wild Soil",
            type: "비누",
            image:
              "https://images.unsplash.com/photo-1614777735430-7b46ca80f2b2?q=80&w=1471&auto=format&fit=crop",
          },
          {
            id: "d3",
            name: "Freedom Mist",
            type: "룸스프레이",
            image:
              "https://images.unsplash.com/photo-1569303553252-a173df2a9bf3?q=80&w=1528&auto=format&fit=crop",
          },
          {
            id: "d4",
            name: "Wanderer's Candle",
            type: "캔들",
            image:
              "https://images.unsplash.com/photo-1557308563-637d4a70cba0?q=80&w=1374&auto=format&fit=crop",
          },
        ],
      };
    } else if (perfumeId === "3") {
      // 세 번째 향수 데이터 (To My X)
      mockPerfume = {
        id: "3",
        name: "To My X",
        story:
          "I couldn't let you go, so I sealed you in a scent.\n\n떠난 당신을 보낼 수 없어서, 나는 당신의 흔적을 향기에 담았습니다. 우리가 함께했던 숲속의 기억, 비 내리는 날 당신의 머리카락에서 나던 이끼 향, 그리고 마지막으로 나눈 포옹에서 느꼈던 따뜻함까지. 이 향기가 당신을 놓아주는 마지막 의식이 되길.",
        price: "0.42 ETH",
        tags: ["숲", "우디", "이끼", "그리움"],
        creator: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        image: thirdImg,
        derivatives: [
          {
            id: "d1",
            name: "Woods Memory",
            type: "디퓨저",
            image:
              "https://images.unsplash.com/photo-1596644462293-d845f3b3cbe8?q=80&w=1470&auto=format&fit=crop",
          },
          {
            id: "d2",
            name: "Moss Bath",
            type: "비누",
            image:
              "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=1471&auto=format&fit=crop",
          },
          {
            id: "d3",
            name: "Forest Mist",
            type: "룸스프레이",
            image:
              "https://images.unsplash.com/photo-1596522354195-e084f8e8a4b1?q=80&w=1528&auto=format&fit=crop",
          },
          {
            id: "d4",
            name: "Memory Candle",
            type: "캔들",
            image:
              "https://images.unsplash.com/photo-1603697439787-118bafe50359?q=80&w=1374&auto=format&fit=crop",
          },
        ],
      };
    } else {
      // 첫 번째 향수 데이터 (Trace of Her Midnight Aura)
      mockPerfume = {
        id: "1",
        name: "Trace of Her Midnight Aura",
        subtitle: "She left no words behind. Only the scent remained.",
        story:
          "She walked beneath the silver moon, wearing a scent that spoke of solitude, defiance, and desire.\nNot a fragrance to be shared, but to be remembered.\nLong after she vanished into the night, the scent lingered— haunting, bold, and unapologetically hers.",
        price: "0.35 ETH",
        tags: ["Midnight", "Haunting", "Bold"],
        creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        image: firstImg,
        derivatives: [
          {
            id: "d1",
            name: "Midnight Dream",
            type: "디퓨저",
            image:
              "https://images.unsplash.com/photo-1596644462293-d845f3b3cbe8?q=80&w=1470&auto=format&fit=crop",
          },
          {
            id: "d2",
            name: "Aura Bath",
            type: "비누",
            image:
              "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=1471&auto=format&fit=crop",
          },
          {
            id: "d3",
            name: "Midnight Mist",
            type: "룸스프레이",
            image:
              "https://images.unsplash.com/photo-1596522354195-e084f8e8a4b1?q=80&w=1528&auto=format&fit=crop",
          },
          {
            id: "d4",
            name: "Moonlight Candle",
            type: "캔들",
            image:
              "https://images.unsplash.com/photo-1603697439787-118bafe50359?q=80&w=1374&auto=format&fit=crop",
          },
        ],
      };
    }

    setPerfume(mockPerfume);
  }, [id]);

  // 추천 향기 데이터 - id에 따라 다른 추천 향기 표시
  const getRecommendations = () => {
    // 실제 id값을 사용 (없으면 "1"로 기본값 지정)
    const perfumeId = id || "1";

    if (perfumeId === "2") {
      // To My Memory by the Sea 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Coastal Breeze",
          description: "해안가의 시원한 바람과 소금기를 담은 향",
          image:
            "https://images.unsplash.com/photo-1533693906097-c8d83a7a1a5b?q=80&w=1470&auto=format&fit=crop",
        },
        {
          id: "r2",
          name: "Summer Tuberose",
          description:
            "여름날의 달콤한 튜베로즈 향이 밀려오는 파도처럼 퍼져나가는 향수",
          image:
            "https://images.unsplash.com/photo-1541090823-259a71e5a652?q=80&w=1528&auto=format&fit=crop",
        },
        {
          id: "r3",
          name: "Childhood Memory",
          description: "어린 시절의 추억이 담긴 포근하고 따스한 향",
          image:
            "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?q=80&w=1470&auto=format&fit=crop",
        },
      ];
    } else if (perfumeId === "4") {
      // To My Untamed Hours 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Wild Spirit",
          description: "자유롭게 헤매는 영혼을 위한 숲의 향기",
          image:
            "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=1470&auto=format&fit=crop",
        },
        {
          id: "r2",
          name: "Earthy Romance",
          description: "젖은 흙과 이끼의 내음이 묻어나는 낭만적인 향",
          image:
            "https://images.unsplash.com/photo-1467811884194-ae868cd3b74e?q=80&w=1528&auto=format&fit=crop",
        },
        {
          id: "r3",
          name: "Wanderlust",
          description: "떠돌이 영혼의 여정을 담아낸 모험적인 향",
          image:
            "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=1470&auto=format&fit=crop",
        },
      ];
    } else if (perfumeId === "3") {
      // To My X 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Forest Whisper",
          description: "깊은 숲속의 이끼와 나무 껍질이 어우러진 신비로운 향",
          image:
            "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1374&auto=format&fit=crop",
        },
        {
          id: "r2",
          name: "Rainy Memory",
          description: "비 내린 후 숲속의 상쾌함을 담은 그리움의 향",
          image:
            "https://images.unsplash.com/photo-1569201529241-f96205e2f2c6?q=80&w=1528&auto=format&fit=crop",
        },
        {
          id: "r3",
          name: "Emotional Woods",
          description: "감정의 기억을 나무 향으로 표현한 우디 향수",
          image:
            "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=1470&auto=format&fit=crop",
        },
      ];
    } else {
      // Trace of Her Midnight Aura 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Velvet Orchid",
          description: "신비로운 심해의 보석처럼 은은하게 빛나는 향",
          image:
            "https://images.unsplash.com/photo-1611414922957-c103be243074?q=80&w=1470&auto=format&fit=crop",
        },
        {
          id: "r2",
          name: "Cedar Noir",
          description: "숲의 깊은 곳에서 느껴지는 차분하고 묵직한 향",
          image:
            "https://images.unsplash.com/photo-1601295865302-67daefa31e24?q=80&w=1374&auto=format&fit=crop",
        },
        {
          id: "r3",
          name: "Sunset Bloom",
          description: "붉은 노을처럼 따뜻하고 달콤한 플로럴 향",
          image:
            "https://images.unsplash.com/photo-1599733594230-8cc02c369cf5?q=80&w=1469&auto=format&fit=crop",
        },
      ];
    }
  };

  // 지갑 주소 포맷
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  if (!perfume) {
    return <div>Loading...</div>;
  }

  const recommendations = getRecommendations();

  return (
    <>
      {/* 향기 상세 정보 섹션 - 흰색 배경 */}
      <Section $bgColor="#ffffff">
        <Container>
          <SectionTitle>SCENTED EXHIBITION</SectionTitle>

          <PerfumeCard>
            <PerfumeImageWrapper>
              <ImageContainer>
                <StyledImage src={perfume.image} alt={perfume.name} />
              </ImageContainer>
            </PerfumeImageWrapper>

            <PerfumeInfo>
              <PerfumeName>{perfume.name}</PerfumeName>
              {perfume.subtitle && (
                <PerfumeSubtitle>{perfume.subtitle}</PerfumeSubtitle>
              )}
              <PerfumeStory>{perfume.story}</PerfumeStory>
              <PerfumePrice>{perfume.price}</PerfumePrice>

              <TagsContainer>
                {perfume.tags.map((tag, index) => (
                  <Tag key={index}>#{tag}</Tag>
                ))}
              </TagsContainer>

              <CreatorInfo>
                <CreatorLabel>Creator:</CreatorLabel>
                <CreatorAddress>
                  {user?.wallet?.address
                    ? formatAddress(user.wallet.address)
                    : formatAddress(perfume.creator)}
                </CreatorAddress>
              </CreatorInfo>

              <ButtonContainer>
                <Button to="#">구매하기</Button>
                <BackButton to="/scentmarket">돌아가기</BackButton>
              </ButtonContainer>
            </PerfumeInfo>
          </PerfumeCard>
        </Container>
      </Section>

      {/* 파생 상품 섹션 - 검정색 배경 */}
      <Section
        $bgColor="#000000"
        style={{ backgroundColor: "#000000", position: "relative" }}
      >
        <Container>
          <SectionTitle $dark>COLLECTION DERIVATIVES</SectionTitle>

          <DerivativesGrid>
            {perfume.derivatives.map((derivative) => (
              <DerivativeCard key={derivative.id}>
                <DerivativeImage>
                  <img src={derivative.image} alt={derivative.name} />
                </DerivativeImage>
                <DerivativeInfo>
                  <h4>{derivative.name}</h4>
                  <p>{derivative.type}</p>
                </DerivativeInfo>
              </DerivativeCard>
            ))}
          </DerivativesGrid>
        </Container>
      </Section>

      {/* 추천 향기 섹션 - 흰색 배경 */}
      <Section $bgColor="#ffffff" style={{ backgroundColor: "#ffffff" }}>
        <Container>
          <SectionTitle>YOU MAY ALSO LIKE</SectionTitle>

          <RecommendationsGrid>
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id}>
                <RecommendationImage>
                  <img src={recommendation.image} alt={recommendation.name} />
                </RecommendationImage>
                <RecommendationOverlay>
                  <h4>{recommendation.name}</h4>
                  <p>{recommendation.description}</p>
                </RecommendationOverlay>
              </RecommendationCard>
            ))}
          </RecommendationsGrid>
        </Container>
      </Section>
    </>
  );
};

export default ScentDetail;
