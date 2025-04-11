import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: rgba(10, 10, 10, 0.9);
  color: #999;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: #ddd;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const Copyright = styled.p`
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #ddd;
  font-size: 1.2rem;
  transition: color 0.3s, transform 0.3s;
  
  &:hover {
    color: var(--primary);
    transform: translateY(-3px);
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="#">이용약관</FooterLink>
        <FooterLink href="#">개인정보 처리방침</FooterLink>
        <FooterLink href="#">서비스 소개</FooterLink>
        <FooterLink href="#">문의하기</FooterLink>
      </FooterLinks>
      
      <Copyright>
        &copy; {currentYear} 퍼퓸 AI. 모든 권리 보유.
      </Copyright>
      
      <SocialLinks>
        <SocialIcon href="#" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </SocialIcon>
        <SocialIcon href="#" aria-label="Discord">
          <i className="fab fa-discord"></i>
        </SocialIcon>
        <SocialIcon href="#" aria-label="Medium">
          <i className="fab fa-medium"></i>
        </SocialIcon>
        <SocialIcon href="#" aria-label="Github">
          <i className="fab fa-github"></i>
        </SocialIcon>
      </SocialLinks>
    </FooterContainer>
  );
};

export default Footer; 