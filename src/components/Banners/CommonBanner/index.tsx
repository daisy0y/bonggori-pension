import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { getBannerName } from 'enums/BannerType';

const StyledCommonBanner = styled.div`
  width: 100%;

  h2 {
    font-weight: 600;
    font-size: 3.75rem;
  }
`;

export const CommonBanner = () => {
  const [bannerName, setBannerName] = useState<string>('');

  useEffect(() => {
    const pathName = getBannerName(window.location.pathname);
    setBannerName(pathName);
  }, []);

  return (
    <StyledCommonBanner>
      <h2>{bannerName}</h2>
    </StyledCommonBanner>
  );
};
