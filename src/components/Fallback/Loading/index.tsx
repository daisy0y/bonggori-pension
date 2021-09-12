import { Spin } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { dataLoading } from 'recoil/ui';
import styled from 'styled-components';
const StyledLoading = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;
export const Loading = () => {
  const isLoading = useRecoilValue(dataLoading);

  return isLoading ? (
    <StyledLoading>
      <Spin size="large" />
    </StyledLoading>
  ) : (
    <></>
  );
};