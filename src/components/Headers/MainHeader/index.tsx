import { useRouter } from 'next/router';
import { useCallback } from 'react';

import styled from 'styled-components';

import { MAIN } from 'lib/routers';

import { LoginButton, MainNav } from 'components';

const StyledMainHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;

  div {
    display: flex;
  }
`;

export const MainHeader = () => {
  const router = useRouter();

  const handleGoMain = useCallback(() => {
    router.push(MAIN);
  }, []);

  return (
    <StyledMainHeader>
      <div>
        <h1 id="logo" onClick={handleGoMain}>
          BGR
        </h1>
        <MainNav />
      </div>
      <LoginButton />
    </StyledMainHeader>
  );
};
