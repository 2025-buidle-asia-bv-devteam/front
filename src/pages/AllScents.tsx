import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
}

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
  padding: 6rem 0;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  letter-spacing: -0.03em;
`;

const SubTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 300;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 0.6rem 1.5rem;
  background: ${(props) => (props.$active ? "#000" : "transparent")};
  color: ${(props) => (props.$active ? "#fff" : "#000")};
  border: 1px solid #000;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;

  &:hover {
    background: ${(props) => (props.$active ? "#000" : "rgba(0,0,0,0.1)")};
  }
`;

const Gallery = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const ScentCard = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  background: #fff;
  transition: transform 0.3s ease;
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 370px;
  overflow: hidden;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${ScentCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

const CardPrice = styled.div`
  font-size: 1.1rem;
  color: #92847a;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CardTag = styled.span`
  font-size: 0.8rem;
  padding: 0.3rem 0.8rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  color: #333;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  padding: 0.7rem 0;
  width: 100%;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  text-align: center;
  text-decoration: none;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;

  &:hover {
    background: #000;
    color: #fff;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 5rem 0;
  grid-column: 1 / -1;
  color: #666;
  font-size: 1.2rem;
`;

const BackToTop = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
  z-index: 100;

  &:hover {
    opacity: 1;
  }

  &::before {
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    border-style: solid;
    border-width: 0 2px 2px 0;
    transform: rotate(-135deg);
    display: inline-block;
    margin-top: 0.3rem;
  }
`;

type FilterType = "all" | "bottle" | "ai" | "collab";

const AllScents: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 데이터 로드
  useEffect(() => {
    // 기존 향수 데이터에 추가 샘플 데이터를 포함
    const mockPerfumes: Perfume[] = [
      {
        id: "1",
        name: "Her Aura Was Not Meant to Stay",
        story:
          "She left that night without closing the door.\nOnly her scent remained on the sheets.\nYou may own this feeling—\nbut you'll never understand it.\nShe lives only in my memory.",
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
          "She wore the same scent every day.\nI only saw my mother—never the woman she was.\nBut years later, wearing that perfume myself,\nI finally understood what she longed for.",
        price: "0.28 ETH",
        tags: ["Nostalgia", "Tuberose", "Maternal", "Longing"],
        creator: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        image: secondImg,
      },
      {
        id: "3",
        name: "To My X",
        story: "I couldn't let you go, so I sealed you in a scent.",
        price: "0.42 ETH",
        tags: ["Forest", "Woody", "Moss", "Heartache"],
        creator: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        image: thirdImg,
      },
      {
        id: "4",
        name: "The Scent We Left in the Dirt",
        subtitle:
          "Before we grew up. Before we were husbands. We were wild.\nThere was a time",
        story:
          "when all we needed was a Jeep, two tents,\nand a bottle that smelled like smoke and pine.\n\nWe weren't fathers then—\njust boys chasing the edge of freedom,",
        price: "0.38 ETH",
        tags: ["Freedom", "Earth", "Forest", "Untamed"],
        creator: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        image: fourthImg,
      },
      // 추가 샘플 데이터 - 같은 이미지 재사용
      {
        id: "5",
        name: "Echoes of Autumn",
        story: "Memories pressed between pages of fallen leaves.",
        price: "0.32 ETH",
        tags: ["Amber", "Nostalgia", "Warmth"],
        creator: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        image: secondImg,
      },
      {
        id: "6",
        name: "Velvet Midnight",
        story: "The city sleeps, but secrets never do.",
        price: "0.41 ETH",
        tags: ["Dark", "Mysterious", "Urban"],
        creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        image: firstImg,
      },
      {
        id: "7",
        name: "Lost in Translation",
        subtitle: "Words we never said, feelings never explained.",
        story: "Some emotions have no language, only scent.",
        price: "0.36 ETH",
        tags: ["Subtle", "Complex", "Emotional"],
        creator: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        image: thirdImg,
      },
      {
        id: "8",
        name: "Wanderlust",
        story: "The smell of distant places calling your name.",
        price: "0.39 ETH",
        tags: ["Adventure", "Freedom", "Journey"],
        creator: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        image: fourthImg,
      },
      {
        id: "9",
        name: "Ephemeral",
        subtitle: "Beauty in the fleeting moment",
        story:
          "Like cherry blossoms caught in the spring breeze, gone too soon.",
        price: "0.33 ETH",
        tags: ["Floral", "Delicate", "Spring"],
        creator: "0x831d35Cc6634C0532925a3b844Bc454e4438f22a",
        image: secondImg,
      },
      {
        id: "10",
        name: "Solitude",
        story: "The comfort found in being alone with your thoughts.",
        price: "0.37 ETH",
        tags: ["Peaceful", "Introspective", "Calm"],
        creator: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        image: firstImg,
      },
      {
        id: "11",
        name: "Vintage Dreams",
        story: "Memories stored in old leather and sun-faded photographs.",
        price: "0.40 ETH",
        tags: ["Vintage", "Leather", "Memory"],
        creator: "0x453d35Cc6634C0532925a3b844Bc454e4438f86c",
        image: thirdImg,
      },
      {
        id: "12",
        name: "After Rain",
        subtitle: "The world renewed",
        story: "The scent of earth after rain, promises of new beginnings.",
        price: "0.34 ETH",
        tags: ["Fresh", "Earthy", "Renewal"],
        creator: "0x642d35Cc6634C0532925a3b844Bc454e4438f52d",
        image: fourthImg,
      },
    ];

    setPerfumes(mockPerfumes);

    // 스크롤 이벤트 리스너 추가
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 필터링된 향수 목록
  const filteredPerfumes = perfumes.filter((perfume) => {
    if (filter === "all") return true;
    // 여기에 필터 로직 추가 (실제로는 데이터에 필터 필드를 추가해야 함)
    return true;
  });

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageContainer>
      <PageHeader>
        <Title>Digital Scent Collection</Title>
        <SubTitle>
          Explore our full collection of digital scents, each with its own
          unique story and emotional journey.
        </SubTitle>
      </PageHeader>

      <FilterBar>
        <FilterButton
          $active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All Scents
        </FilterButton>
        <FilterButton
          $active={filter === "bottle"}
          onClick={() => setFilter("bottle")}
        >
          Bottled Scents
        </FilterButton>
        <FilterButton $active={filter === "ai"} onClick={() => setFilter("ai")}>
          AI Generated
        </FilterButton>
        <FilterButton
          $active={filter === "collab"}
          onClick={() => setFilter("collab")}
        >
          Collaborations
        </FilterButton>
      </FilterBar>

      <Gallery>
        {filteredPerfumes.length > 0 ? (
          filteredPerfumes.map((perfume) => (
            <ScentCard
              key={perfume.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CardImageContainer>
                <CardImage src={perfume.image} alt={perfume.name} />
              </CardImageContainer>
              <CardContent>
                <CardTitle>{perfume.name}</CardTitle>
                <CardPrice>{perfume.price}</CardPrice>
                <CardTags>
                  {perfume.tags.slice(0, 3).map((tag, index) => (
                    <CardTag key={index}>#{tag}</CardTag>
                  ))}
                </CardTags>
                <ViewButton to={`/marketplace/${perfume.id}`}>
                  View Details
                </ViewButton>
              </CardContent>
            </ScentCard>
          ))
        ) : (
          <NoResults>No scents found matching your criteria.</NoResults>
        )}
      </Gallery>

      {showBackToTop && <BackToTop onClick={scrollToTop} />}
    </PageContainer>
  );
};

export default AllScents;
