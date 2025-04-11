import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import {
  HeaderContainer,
  Logo,
  NavContainer,
  NavLink,
  WalletButton,
  WalletAddress
} from '../../styles/Header.styles';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { login, logout, authenticated, user } = usePrivy();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <WalletButton isConnected={authenticated} onClick={authenticated ? logout : login}>
            {authenticated ? 'Logout' : 'LogIn'}
          </WalletButton>

          {authenticated && user?.wallet?.address && (
            <WalletAddress>{formatAddress(user.wallet.address)}</WalletAddress>
          )}

          <div
            className="nav-icon-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="nav-icon">
              {isHovered ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#92283d" className="bi bi-x-diamond-fill" viewBox="0 0 16 16">
                  <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.614L8 8.708l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.614-.706L7.292 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-x-diamond" viewBox="0 0 16 16">
                  <path d="M7.987 16a1.53 1.53 0 0 1-1.07-.448L.45 9.082a1.53 1.53 0 0 1 0-2.165L6.917.45a1.53 1.53 0 0 1 2.166 0l6.469 6.468A1.53 1.53 0 0 1 16 8.013a1.53 1.53 0 0 1-.448 1.07l-6.47 6.469A1.53 1.53 0 0 1 7.988 16zM7.639 1.17 4.766 4.044 8 7.278l3.234-3.234L8.361 1.17a.51.51 0 0 0-.722 0M8.722 8l3.234 3.234 2.873-2.873c.2-.2.2-.523 0-.722l-2.873-2.873zM8 8.722l-3.234 3.234 2.873 2.873c.2.2.523.2.722 0l2.873-2.873zM7.278 8 4.044 4.766 1.17 7.639a.51.51 0 0 0 0 .722l2.874 2.873z" />
                </svg>
              )}
            </div>
            {isHovered && (
              <div className="nav-dropdown-menu">
                <ul>
                  <li><Link to="">About Us</Link></li>
                  <li><Link to="">Contact</Link></li>
                  <li><Link to="">Docs</Link></li>
                  <li><Link to="">Login</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
