import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
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

// 섹션 컴포넌트
const Section = styled.section`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 2rem;
  background-color: #ffffff;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const SectionTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 300;
  color: #000000;
  letter-spacing: 3px;
  margin-bottom: 8rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 5rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 300;
  color: #000000;
  letter-spacing: 1px;
  margin: 5rem 0 2rem;
  text-align: center;
`;

// 향기 카드 컴포넌트
const PerfumeCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12rem;
  margin-bottom: 8rem;

  @media (max-width: 768px) {
    gap: 7rem;
    margin-bottom: 5rem;
  }
`;

const PerfumeCard = styled.div<{ $reversed?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  padding: 3rem 1rem;
  background: #ffffff;
  margin: 0 auto;
  direction: ${(props) => (props.$reversed ? "rtl" : "ltr")};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    direction: ltr;
    padding: 0;
  }
`;

const PerfumeImageWrapper = styled.div`
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  transition: all 0.5s ease;
  direction: ltr;
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

const PerfumeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0;
  direction: ltr;
`;

const PerfumeName = styled.h2`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 2.8rem;
  font-weight: 300;
  color: #000;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  line-height: 1.2;
`;

const PerfumeSubtitle = styled.h3`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.3rem;
  font-weight: 300;
  font-style: italic;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 2.5rem;
  letter-spacing: 0.5px;
  line-height: 1.5;
`;

const PerfumeStory = styled.p`
  font-size: 1.2rem;
  line-height: 1.9;
  color: #333;
  opacity: 0.9;
  margin-bottom: 2.5rem;
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
  font-size: 0.95rem;
  color: #333;
  letter-spacing: 0.5px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #92847a;
  }
`;

const Button = styled(Link)`
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
  transition: all 0.4s ease;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const LoadMoreButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 3rem;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  font-size: 1.1rem;
  letter-spacing: 2px;
  transition: all 0.4s ease;
  text-transform: uppercase;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

// 메인 ScentMarket 컴포넌트
const ScentMarket: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const { user } = usePrivy();

  // 초기 데이터 로드
  useEffect(() => {
    // API 호출 대신 예시 데이터 사용
    const mockPerfumes: Perfume[] = [
      {
        id: "1",
        name: "Trace of Her Midnight Aura",
        story:
          "She walked beneath the silver moon, wearing a scent that spoke of solitude, defiance, and desire. Not a fragrance to be shared, but to be remembered. Long after she vanished into the night, the scent lingered— haunting, bold, and unapologetically hers.",
        price: "0.35 ETH",
        tags: ["Midnight", "Haunting", "Bold"],
        creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        image: firstImg,
      },
      {
        id: "2",
        name: "To My Memory by the Sea",
        subtitle: "그날의 바람은, 튜베로즈처럼 잔잔하게 나를 안아줬어.",
        story:
          "고요한 해변의 기억. 파도는 밀려오고 잔잔히 사라지듯, 네가 남긴 향이 아직도 맴돌아. 소금기 묻은 바람과 함께 피어나는 튜베로즈 향이 어린 시절의 추억을 끄집어내. 지금은 돌아갈 수 없는 시간, 하지만 향기만은 여전히 선명해.",
        price: "0.28 ETH",
        tags: ["추억", "튜베로즈", "고요함", "맑음", "그리움"],
        creator: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        image: secondImg,
      },
      {
        id: "3",
        name: "To My X",
        story: "I couldn't let you go, so I sealed you in a scent.",
        price: "0.42 ETH",
        tags: ["숲", "우디", "이끼", "그리움"],
        creator: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        image: thirdImg,
      },
      {
        id: "4",
        name: "To My Untamed Hours",
        subtitle: "숲의 향, 낙엽 위의 발자국, 어딘가를 향했던 나의 발끝.",
        story:
          "길들여지지 않은 시간 속에서 만난 자유로운 영혼. 젖은 흙냄새와 숲의 그늘이 만들어낸 몽환적 낭만이 공기 중에 흩어진다. 머물지 않았기에 더 강렬했던 시간의 냄새. 아무도 가두지 못한 순간, 향기만이 그 흔적을 기억한다.",
        price: "0.38 ETH",
        tags: ["자유", "흙", "숲", "낭만"],
        creator: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        image: fourthImg,
      },
    ];

    setPerfumes(mockPerfumes);
  }, []);

  // 지갑 주소 포맷
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const handleLoadMore = () => {
    // 실제로는 여기서 다음 페이지 로드 로직이 들어갈 것
    console.log("Load more perfumes");
  };

  if (perfumes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Section>
      <Container>
        <SectionTitle>SCENTED GALLERY</SectionTitle>
        <SubTitle>작품처럼 감상하는 향기의 세계</SubTitle>

        <PerfumeCardList>
          {perfumes.map((perfume, index) => (
            <PerfumeCard key={perfume.id} $reversed={index % 2 !== 0}>
              <PerfumeImageWrapper>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.8 }}
                >
                  <ImageContainer>
                    <StyledImage src={perfume.image} alt={perfume.name} />
                  </ImageContainer>
                </motion.div>
              </PerfumeImageWrapper>

              <PerfumeInfo>
                <PerfumeName>{perfume.name}</PerfumeName>
                {perfume.subtitle && (
                  <PerfumeSubtitle>{perfume.subtitle}</PerfumeSubtitle>
                )}
                <PerfumeStory>{perfume.story}</PerfumeStory>
                <PerfumePrice>{perfume.price}</PerfumePrice>

                <TagsContainer>
                  {perfume.tags.map((tag, idx) => (
                    <Tag key={idx}>#{tag}</Tag>
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

                <Button to={`/marketplace/${perfume.id}`}>구매하기</Button>
              </PerfumeInfo>
            </PerfumeCard>
          ))}
        </PerfumeCardList>

        <LoadMoreButton onClick={handleLoadMore}>더 보기</LoadMoreButton>
      </Container>
    </Section>
  );
};

export default ScentMarket;
