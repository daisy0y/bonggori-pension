import styled from 'styled-components';
import { LoginButton, MainNav } from 'components';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

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
    router.push('/');
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
