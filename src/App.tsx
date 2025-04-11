import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// 페이지 지연 로딩
const Home = lazy(() => import('./pages/Home'));
const PerfumeChat = lazy(() => import('./pages/PerfumeChat'));
const PerfumeGallery = lazy(() => import('./pages/PerfumeGallery'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0;
  position: relative;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<PerfumeChat />} />
            <Route path="/gallery" element={<PerfumeGallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default App; 