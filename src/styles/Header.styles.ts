import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header<{ isScrolled: boolean }>`
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
  background-color: ${({ isScrolled }) => isScrolled ? 'rgba(5, 5, 5, 0.9)' : 'transparent'};
  backdrop-filter: ${({ isScrolled }) => isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ isScrolled }) => isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 0.5cap;

  &:hover {
    text-shadow: 0 0 10px var(--primary);
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const NavLink = styled(Link) <{ $active?: boolean }>`
  color: ${({ $active }) => $active ? 'var(--primary)' : '#fff'};
  font-weight: ${({ $active }) => $active ? 'bold' : 'normal'};
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
    transform: scaleX(${({ $active }) => $active ? 1 : 0});
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export const WalletButton = styled.button<{ isConnected: boolean }>`
  background: ${({ isConnected }) => isConnected ? 'var(--success)' : 'var(--gradient)'};
  color: white;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;

  &:hover {
    box-shadow: 0 0 15px ${({ isConnected }) => isConnected ? 'var(--success)' : 'var(--primary)'};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #333;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const WalletAddress = styled.span`
  margin-left: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.7;
`;
