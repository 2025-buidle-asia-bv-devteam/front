import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ScentMarket from "./pages/ScentMarket";
import ScentDetail from "./pages/ScentDetail";

// 페이지 지연 로딩
const Home = lazy(() => import('./pages/Home'));
const ScentMarket = lazy(() => import('./pages/ScentMarket'));
const ScentStudio = lazy(() => import('./pages/ScentStudio'));
const NotFound = lazy(() => import('./pages/NotFound'));
const MyStudio = lazy(() => import('./pages/MyStudio'));

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
            <Route path="/scentmarket" element={<ScentMarket />} />
            <Route path="/scentstudio" element={<ScentStudio />} />
            <Route path="/marketplace/:id" element={<ScentDetail />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/mystudio" element={<MyStudio />} />
          </Routes>
        </Suspense>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default App;
