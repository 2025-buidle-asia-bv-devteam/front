import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import firstImg from "../assets/image/first.png";
import secondImg from "../assets/image/second.png";
import thirdImg from "../assets/image/third.png";
import fourthImg from "../assets/image/fourth.png";
import f11Img from "../assets/image/f11.png";
import f22Img from "../assets/image/f22.png";
import f33Img from "../assets/image/f33.png";
import diffuserImg from "../assets/image/diffuser.png";
import soapImg from "../assets/image/soap.png";
import roomsprayImg from "../assets/image/roomspray.png";
import candleImg from "../assets/image/candle.png";

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
  padding: 6rem 2rem;
  background-color: ${(props) => props.$bgColor || "#ffffff"};
  overflow: hidden;
  transition: background-color 0.5s ease;
`;

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SectionTitle = styled.h1<{ $dark?: boolean }>`
  font-size: 4rem;
  font-weight: 400;
  color: ${(props) => (props.$dark ? "#ffffff" : "#000000")};
  letter-spacing: -0.03em;
  margin-bottom: 8rem;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

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
  display: flex;
  align-items: center;
  justify-content: center;

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
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: #000;
  z-index: 2;
  letter-spacing: -0.03em;
`;

const ImageSubtitle = styled.p`
  position: absolute;
  top: calc(20% + 3rem);
  left: 0;
  width: 100%;
  text-align: center;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.1rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  letter-spacing: -0.01em;
`;

const PerfumeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
`;

const PerfumeName = styled.h2`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.8rem;
  font-weight: 400;
  color: #000;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.2;
`;

const PerfumeSubtitle = styled.h3`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.3rem;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 2.5rem;
  letter-spacing: -0.01em;
`;

const PerfumeStory = styled.p`
  font-size: 1.2rem;
  line-height: 1.9;
  color: #333;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  white-space: normal;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 4rem auto;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const DerivativeCard = styled.div`
  background: #111;
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
`;

const DerivativeImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #111;
  padding: 1rem;
  box-sizing: border-box;

  img {
    width: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
    transition: transform 0.5s ease;
  }

  ${DerivativeCard}:hover & img {
    transform: scale(1.05);
  }
`;

const DerivativeInfo = styled.div`
  padding: 1.2rem;
  width: 100%;
  text-align: center;
  background-color: #111;

  h4 {
    font-size: 1.2rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

// 추천 향기 컴포넌트
const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const RecommendationCard = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

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
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.8s ease;
  }

  ${RecommendationCard}:hover & img {
    transform: scale(1.05);
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
      // 두 번째 향수 데이터 (The Scent She Wore)
      mockPerfume = {
        id: "2",
        name: "The Scent She Wore",
        subtitle:
          "And I remember her, not as my mother, but as a woman in love.",
        story:
          "She wore the same scent every day. I only saw my mother—never the woman she was. But years later, wearing that perfume myself, I finally understood what she longed for.",
        price: "0.28 ETH",
        tags: ["Nostalgia", "Tuberose", "Maternal", "Longing"],
        creator: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        image: secondImg,
        derivatives: [
          {
            id: "d1",
            name: "Maternal Memory",
            type: "Diffuser",
            image: diffuserImg,
          },
          {
            id: "d2",
            name: "Maternal Memory",
            type: "Soap",
            image: soapImg,
          },
          {
            id: "d3",
            name: "Maternal Memory",
            type: "Room Spray",
            image: roomsprayImg,
          },
          {
            id: "d4",
            name: "Maternal Memory",
            type: "Candle",
            image: candleImg,
          },
        ],
      };
    } else if (perfumeId === "4") {
      // 네 번째 향수 데이터 (The Scent We Left in the Dirt)
      mockPerfume = {
        id: "4",
        name: "The Scent We Left in the Dirt",
        subtitle:
          "Before we grew up. Before we were husbands. We were wild.\nThere was a time",
        story:
          "when all we needed was a Jeep, two tents, and a bottle that smelled like smoke and pine. We weren't fathers then—just boys chasing the edge of freedom,",
        price: "0.38 ETH",
        tags: ["Freedom", "Earth", "Forest", "Untamed"],
        creator: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        image: fourthImg,
        derivatives: [
          {
            id: "d1",
            name: "Dirt Memory",
            type: "Diffuser",
            image: diffuserImg,
          },
          {
            id: "d2",
            name: "Dirt Memory",
            type: "Soap",
            image: soapImg,
          },
          {
            id: "d3",
            name: "Dirt Memory",
            type: "Room Spray",
            image: roomsprayImg,
          },
          {
            id: "d4",
            name: "Dirt Memory",
            type: "Candle",
            image: candleImg,
          },
        ],
      };
    } else if (perfumeId === "3") {
      // 세 번째 향수 데이터 (To My X)
      mockPerfume = {
        id: "3",
        name: "To My X",
        story: "I couldn't let you go, so I sealed you in a scent.",
        price: "0.42 ETH",
        tags: ["Forest", "Woody", "Moss", "Heartache"],
        creator: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        image: thirdImg,
        derivatives: [
          {
            id: "d1",
            name: "X Memory",
            type: "Diffuser",
            image: diffuserImg,
          },
          {
            id: "d2",
            name: "X Memory",
            type: "Soap",
            image: soapImg,
          },
          {
            id: "d3",
            name: "X Memory",
            type: "Room Spray",
            image: roomsprayImg,
          },
          {
            id: "d4",
            name: "X Memory",
            type: "Candle",
            image: candleImg,
          },
        ],
      };
    } else {
      // 첫 번째 향수 데이터 (Her Aura Was Not Meant to Stay)
      mockPerfume = {
        id: "1",
        name: "Her Aura Was Not Meant to Stay",
        story:
          "She left that night without closing the door. Only her scent remained on the sheets. You may own this feeling—but you'll never understand it. She lives only in my memory.",
        price: "0.35 ETH",
        tags: ["Midnight", "Haunting", "Bold", "Mysterious"],
        creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        image: firstImg,
        derivatives: [
          {
            id: "d1",
            name: "Aura Memory",
            type: "Diffuser",
            image: diffuserImg,
          },
          {
            id: "d2",
            name: "Aura Memory",
            type: "Soap",
            image: soapImg,
          },
          {
            id: "d3",
            name: "Aura Memory",
            type: "Room Spray",
            image: roomsprayImg,
          },
          {
            id: "d4",
            name: "Aura Memory",
            type: "Candle",
            image: candleImg,
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
      // The Scent She Wore 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Memoir",
          description: "A nostalgic floral scent capturing childhood memories",
          image: f11Img,
        },
        {
          id: "r2",
          name: "Maternal Embrace",
          description: "Warm and comforting notes of vanilla and amber",
          image: f22Img,
        },
        {
          id: "r3",
          name: "Time Capsule",
          description: "A delicate blend of tuberose and powder notes",
          image: f33Img,
        },
      ];
    } else if (perfumeId === "4") {
      // The Scent We Left in the Dirt 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Wild Spirit",
          description: "A free-spirited woody scent for the adventurous soul",
          image: f11Img,
        },
        {
          id: "r2",
          name: "Earthy Romance",
          description: "Notes of wet soil and moss in a romantic blend",
          image: f22Img,
        },
        {
          id: "r3",
          name: "Wanderlust",
          description:
            "An adventurous scent capturing the journey of a wandering soul",
          image: f33Img,
        },
      ];
    } else if (perfumeId === "3") {
      // To My X 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Forest Whisper",
          description:
            "A mysterious blend of moss and tree bark from deep forest",
          image: f11Img,
        },
        {
          id: "r2",
          name: "Rainy Memory",
          description:
            "The fresh scent of forest after rain with notes of longing",
          image: f22Img,
        },
        {
          id: "r3",
          name: "Emotional Woods",
          description: "A woody fragrance expressing emotional memories",
          image: f33Img,
        },
      ];
    } else {
      // Her Aura Was Not Meant to Stay 향수에 대한 추천
      return [
        {
          id: "r1",
          name: "Velvet Orchid",
          description: "A mysterious scent shimmering like a deep-sea jewel",
          image: f11Img,
        },
        {
          id: "r2",
          name: "Cedar Noir",
          description: "A calm and deep woody scent from the forest depths",
          image: f22Img,
        },
        {
          id: "r3",
          name: "Sunset Bloom",
          description: "A warm and sweet floral scent like a red sunset",
          image: f33Img,
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
          <SectionTitle>SCENT PROFILE</SectionTitle>

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
              <PerfumeStory
                style={{
                  fontStyle: "italic",
                  lineHeight: "1.9",
                  fontSize: "1.15rem",
                  color: "#444",
                }}
              >
                {perfume.story}
              </PerfumeStory>
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
                <Button to="#" style={{ background: "#000", color: "#fff" }}>
                  Buy Now
                </Button>
                <BackButton to="/scentmarket">Back to Market</BackButton>
              </ButtonContainer>
            </PerfumeInfo>
          </PerfumeCard>
        </Container>
      </Section>

      {/* 파생 상품 섹션 - 검정색 배경 */}
      <Section
        $bgColor="#000000"
        style={{
          backgroundColor: "#000000",
          position: "relative",
          padding: "5rem 0 6rem 0",
        }}
      >
        <Container style={{ padding: "0 1rem" }}>
          <SectionTitle $dark style={{ marginBottom: "3rem" }}>
            COLLECTION DERIVATIVES
          </SectionTitle>

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
      <Section
        $bgColor="#ffffff"
        style={{ backgroundColor: "#ffffff", padding: "6rem 0 8rem 0" }}
      >
        <Container style={{ padding: "0 1rem" }}>
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
