import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useWallet } from '../../context/WalletContext';

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: ${props => props.isScrolled ? 'rgba(5, 5, 5, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  
  &:hover {
    text-shadow: 0 0 10px var(--primary);
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${props => props.$active ? 'var(--primary)' : '#fff'};
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  padding: 0.5rem 1rem;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
    height: 2px;
    background-color: var(--primary);
    transform: scaleX(${props => props.$active ? 1 : 0});
    transform-origin: center;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const WalletButton = styled.button<{ isConnected: boolean }>`
  background: ${props => props.isConnected ? 'var(--success)' : 'var(--gradient)'};
  color: white;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  
  &:hover {
    box-shadow: 0 0 15px ${props => props.isConnected ? 'var(--success)' : 'var(--primary)'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #333;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

const WalletAddress = styled.span`
  margin-left: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Header: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const handleWalletClick = () => {
    if (account) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };
  
  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 주소 표시 형식 변환
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Logo to="/">퍼퓸 AI</Logo>
      
      <NavContainer>
        <NavLink to="/" $active={location.pathname === '/'}>홈</NavLink>
        <NavLink to="/chat" $active={location.pathname === '/chat'}>AI 대화</NavLink>
        <NavLink to="/gallery" $active={location.pathname === '/gallery'}>향수 갤러리</NavLink>
        
        <WalletButton 
          isConnected={!!account} 
          onClick={handleWalletClick} 
          disabled={isConnecting}
        >
          {isConnecting ? '연결 중...' : (
            account ? (
              <>
                연결됨 <WalletAddress>{formatAddress(account)}</WalletAddress>
              </>
            ) : '지갑 연결'
          )}
        </WalletButton>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 