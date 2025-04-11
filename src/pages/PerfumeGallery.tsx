import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useWallet } from '../context/WalletContext';

interface Perfume {
  id: number;
  name: string;
  description: string;
  creator: string;
  imageUrl: string;
  likes: number;
  price: string;
  isOwned: boolean;
}

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 100px auto 2rem;
  padding: 0 1.5rem;
`;

const GalleryHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #ddd;
  font-size: 1.2rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'var(--gradient)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => !props.$active && 'rgba(255, 255, 255, 0.2)'};
  }
`;

const SearchInput = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  color: white;
  min-width: 200px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary);
  }
`;

const PerfumeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const PerfumeCard = styled.div`
  background: rgba(20, 20, 20, 0.6);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(138, 43, 226, 0.3);
  }
`;

const PerfumeImage = styled.div<{ backgroundUrl: string }>`
  height: 280px;
  background-image: url(${props => props.backgroundUrl});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const OwnedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--success);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const PerfumeInfo = styled.div`
  padding: 1.5rem;
`;

const PerfumeName = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  color: #fff;
`;

const PerfumeDescription = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const PerfumeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PerfumeCreator = styled.div`
  font-size: 0.8rem;
  color: #888;
`;

const PerfumePrice = styled.div`
  font-size: 1rem;
  color: var(--secondary);
  font-weight: bold;
`;

const LikeButton = styled.button<{ $liked: boolean }>`
  background: none;
  border: none;
  color: ${props => props.$liked ? 'var(--primary)' : '#aaa'};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &:hover {
    color: var(--primary);
  }
`;

const BuyButton = styled.button`
  background: var(--gradient);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
  }
`;

const ConnectPrompt = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  background: rgba(10, 10, 10, 0.8);
  border-radius: 15px;
  margin: 3rem 0;
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

// 더미 데이터
const dummyPerfumes: Perfume[] = [
  {
    id: 1,
    name: "에테리얼 문라이트",
    description: "자스민, 앰버, 머스크가 조화를 이루는 은은한 달빛 아래의 향기",
    creator: "0x1a2b...3c4d",
    imageUrl: "https://images.unsplash.com/photo-1588405748880-12d1d2c9d9e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxfDB8MXxyYW5kb218MHx8cGVyZnVtZXx8fHx8fDE2MzEyMDI4MzA&ixlib=rb-4.0.3&q=80&w=1080",
    likes: 42,
    price: "0.05 ETH",
    isOwned: false
  },
  {
    id: 2,
    name: "미스티 가든",
    description: "로즈마리, 베르가못, 페퍼민트의 상쾌한 아침 정원 향기",
    creator: "0x5e6f...7g8h",
    imageUrl: "https://images.unsplash.com/photo-1592364395653-83e648b20cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxfDB8MXxyYW5kb218MHx8cGVyZnVtZXx8fHx8fDE2MzEyMDI4MzA&ixlib=rb-4.0.3&q=80&w=1080",
    likes: 29,
    price: "0.08 ETH",
    isOwned: true
  },
  {
    id: 3,
    name: "다크 엠버",
    description: "앰버, 우드, 바닐라의 따뜻하고 깊은 밤의 향기",
    creator: "0x9i0j...1k2l",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxfDB8MXxyYW5kb218MHx8cGVyZnVtZXx8fHx8fDE2MzEyMDI4MzA&ixlib=rb-4.0.3&q=80&w=1080",
    likes: 57,
    price: "0.12 ETH",
    isOwned: false
  },
  {
    id: 4,
    name: "시트러스 브리즈",
    description: "레몬, 베르가못, 그레이프프루트의 상큼한 해변 향기",
    creator: "0x3m4n...5o6p",
    imageUrl: "https://images.unsplash.com/photo-1563170423-540fd5508c60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxfDB8MXxyYW5kb218MHx8cGVyZnVtZXx8fHx8fDE2MzEyMDI4MzA&ixlib=rb-4.0.3&q=80&w=1080",
    likes: 34,
    price: "0.06 ETH",
    isOwned: false
  },
  {
    id: 5,
    name: "오리엔탈 스파이스",
    description: "시나몬, 카다몸, 정향의 따뜻한 동양적 향기",
    creator: "0x7q8r...9s0t",
    imageUrl: "https://images.unsplash.com/photo-1585178453700-0344c80c4b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxfDB8MXxyYW5kb218MHx8cGVyZnVtZXx8fHx8fDE2MzEyMDI4MzA&ixlib=rb-4.0.3&q=80&w=1080",
    likes: 62,
    price: "0.09 ETH",
    isOwned: false
  },
  {
    id: 6,
    name: "벨벳 로즈",
    description: "로즈, 피오니, 패츌리의 고급스러운 플로럴 향기",
    creator: "0x1u2v...3w4x",
    imageUrl: "https://images.unsplash.com/photo-1599447541321-50706272dd44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxfDB8MXxyYW5kb218MHx8cGVyZnVtZXx8fHx8fDE2MzEyMDI4MzA&ixlib=rb-4.0.3&q=80&w=1080",
    likes: 48,
    price: "0.11 ETH",
    isOwned: true
  }
];

const PerfumeGallery: React.FC = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>(dummyPerfumes);
  const [likedPerfumes, setLikedPerfumes] = useState<number[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { account, connectWallet } = useWallet();

  const handleLike = (id: number) => {
    const isAlreadyLiked = likedPerfumes.includes(id);
    
    if (isAlreadyLiked) {
      setLikedPerfumes(prev => prev.filter(perfumeId => perfumeId !== id));
      setPerfumes(prev => prev.map(perfume => 
        perfume.id === id ? { ...perfume, likes: perfume.likes - 1 } : perfume
      ));
    } else {
      setLikedPerfumes(prev => [...prev, id]);
      setPerfumes(prev => prev.map(perfume => 
        perfume.id === id ? { ...perfume, likes: perfume.likes + 1 } : perfume
      ));
    }
  };

  const filteredPerfumes = perfumes.filter(perfume => {
    const matchesSearch = perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          perfume.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'owned') return perfume.isOwned && matchesSearch;
    if (activeFilter === 'popular') return perfume.likes >= 40 && matchesSearch;
    
    return matchesSearch;
  });

  if (!account) {
    return (
      <GalleryContainer>
        <GalleryHeader>
          <Title>향수 갤러리</Title>
          <Subtitle>세상에 하나뿐인 AI 생성 향수를 발견하고 소유하세요</Subtitle>
        </GalleryHeader>
        
        <ConnectPrompt>
          <h2>향수 갤러리를 보려면 지갑 연결이 필요합니다</h2>
          <p>지갑을 연결하시면 다양한 향수를 구경하고 구매할 수 있습니다.</p>
          <ConnectButton onClick={connectWallet}>지갑 연결하기</ConnectButton>
        </ConnectPrompt>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <GalleryHeader>
        <Title>향수 갤러리</Title>
        <Subtitle>세상에 하나뿐인 AI 생성 향수를 발견하고 소유하세요</Subtitle>
      </GalleryHeader>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterButton 
            $active={activeFilter === 'all'} 
            onClick={() => setActiveFilter('all')}
          >
            전체 보기
          </FilterButton>
          <FilterButton 
            $active={activeFilter === 'owned'} 
            onClick={() => setActiveFilter('owned')}
          >
            내 소유
          </FilterButton>
          <FilterButton 
            $active={activeFilter === 'popular'} 
            onClick={() => setActiveFilter('popular')}
          >
            인기 향수
          </FilterButton>
        </FilterGroup>
        
        <SearchInput 
          type="text" 
          placeholder="향수 검색..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FiltersContainer>
      
      <PerfumeGrid>
        {filteredPerfumes.map(perfume => (
          <PerfumeCard key={perfume.id}>
            <PerfumeImage backgroundUrl={perfume.imageUrl}>
              {perfume.isOwned && <OwnedBadge>소유 중</OwnedBadge>}
            </PerfumeImage>
            <PerfumeInfo>
              <PerfumeName>{perfume.name}</PerfumeName>
              <PerfumeDescription>{perfume.description}</PerfumeDescription>
              <PerfumeFooter>
                <LikeButton 
                  $liked={likedPerfumes.includes(perfume.id)}
                  onClick={() => handleLike(perfume.id)}
                >
                  ♥ {perfume.likes}
                </LikeButton>
                <PerfumePrice>{perfume.price}</PerfumePrice>
              </PerfumeFooter>
              <PerfumeCreator>제작자: {perfume.creator}</PerfumeCreator>
              
              {!perfume.isOwned && (
                <BuyButton>구매하기</BuyButton>
              )}
            </PerfumeInfo>
          </PerfumeCard>
        ))}
      </PerfumeGrid>
    </GalleryContainer>
  );
};

export default PerfumeGallery; 