import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { JOIN, MAIN } from 'lib/routers';

import { LoginForm } from 'components';
import styled from 'styled-components';
import Link from 'next/link';
import { theme } from 'styles/Theme';
import { isLoginSelector, userState } from 'recoil/user';

const Container = styled.div`
  padding: 6.875rem 2.5rem 1.875rem 2.5rem;
`;

const StyledHeaderTextBox = styled.div`
  margin-bottom: 7.313rem;

  h1 {
    font-size: ${theme.size_30};
    font-weight: ${theme.weight_bold};
  }
  p {
    color: ${theme.gray};
    font-size: ${theme.size_16}
  }
`;

const StyledJoinText = styled.div`
  white-space: nowrap;
  display: flex;
  gap: 0.3rem;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50% ,0);
  color: ${theme.gray};
  a {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const isLogin = useRecoilValue(isLoginSelector);

  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push(MAIN);
    }
  }, [isLogin]);

  return (
    <Container>
      <StyledHeaderTextBox>
        <h1>Welcome 🤗</h1>
        <p>실시간 예약은 로그인 후 이용 가능합니다.</p>
      </StyledHeaderTextBox>

      <LoginForm />

      <StyledJoinText>
        <p>회원이 아니신가요?</p>
        <Link href={JOIN}>
          회원 가입하러 가기
        </Link>
      </StyledJoinText>
    </Container>
  );
};

export default LoginPage;
