import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import {
  HeaderContainer,
  Logo,
  NavContainer,
  NavLink,
  WalletButton,
  WalletAddress,
} from "../../styles/Header.styles";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { login, logout, authenticated, user } = usePrivy();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Logo to="/">THYMIAN</Logo>

      <NavContainer>
        <NavLink to="/scentstudio" $active={location.pathname === '/scentstudio'}>Scent Studio</NavLink>
        <NavLink to="/scentmarket" $active={location.pathname === '/scentmarket'}>Scent Market</NavLink>
        <NavLink to="/galleryzone" $active={location.pathname === '/galleryzone'}>Gallery Zone</NavLink>
        <NavLink to="/mystudio" $active={location.pathname === '/mystudio'}>My Studio</NavLink>
        <NavLink to="/scentcontest" $active={location.pathname === '/scentcontest'}>Stadium</NavLink>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <WalletButton isConnected={authenticated} onClick={authenticated ? logout : login}>
            {authenticated ? 'Logout' : 'LogIn'}
          </WalletButton>

          {authenticated && user?.wallet?.address && (
            <WalletAddress>{formatAddress(user.wallet.address)}</WalletAddress>
          )}
        </div>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
