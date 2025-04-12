import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/common/ScrollTop";

const Home = lazy(() => import('./pages/Home'));
const ScentMarket = lazy(() => import('./pages/ScentMarket'));
const ScentDetail = lazy(() => import('./pages/ScentDetail'));
const ScentStudio = lazy(() => import('./pages/ScentStudio'));
const ScentImageStudio = lazy(() => import('./pages/ScentImageStudio'));
const ScentPublish = lazy(() => import('./pages/ScentPublish'));
const GalleryZone = lazy(() => import('./pages/GalleryZone'));
const AllScents = lazy(() => import('./pages/AllScents'));
const NotFound = lazy(() => import('./pages/NotFound'));
const MyStudio = lazy(() => import('./pages/MyStudio'));
const ScentContest = lazy(() => import('./pages/ScentStadium'));

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
      <ScrollToTop />
      <Header />
      <MainContent>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scentmarket" element={<ScentMarket />} />
            <Route path="/scentstudio" element={<ScentStudio />} />
            <Route path="/scentimagestudio" element={<ScentImageStudio />} />
            <Route path="/scentpublish" element={<ScentPublish />} />
            <Route path="/marketplace/:id" element={<ScentDetail />} />
            <Route path="/galleryzone" element={<GalleryZone />} />
            <Route path="/scents/all" element={<AllScents />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/mystudio" element={<MyStudio />} />
            <Route path="/scentcontest" element={<ScentContest />} />
          </Routes>
        </Suspense>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

export default App;
