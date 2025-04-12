import React from "react";
import styled from "styled-components";
import SplitGallery from "../components/SplitGallery";

const GalleryZoneContainer = styled.div`
  width: 100%;
`;

const GalleryZone: React.FC = () => {
  return (
    <GalleryZoneContainer>
      <SplitGallery />
    </GalleryZoneContainer>
  );
};

export default GalleryZone;
