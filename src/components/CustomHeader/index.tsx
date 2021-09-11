import { useCallback } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

export const CustomHeader = () => {
  const router = useRouter();

  const handleClickLogin = useCallback(() => {
    router.push('login');
  }, []);

  const StyledHeader = styled.div`
    z-index: 1;
    height: 100px;
  `;

  return (
    <StyledHeader>
      <div onClick={handleClickLogin}> LOGIN</div>
    </StyledHeader>
  );
};
