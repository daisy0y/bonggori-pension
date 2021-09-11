import styled from 'styled-components';

import { useTabletSize } from 'lib/hooks';

import loginImg from 'assets/img/login-img.jpeg';

const StyledLoginJoinLayout = styled.div<{ isPc: boolean }>`
  display: flex;
  height: 100vh;
`;

const StyledImageArea = styled.div<{ imgUrl }>`
  background-image: url(${props => props.imgUrl.src});
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface LoginJoinLayoutProps {
  children: React.ReactNode;
}

export const LoginJoinLayout = (props: LoginJoinLayoutProps) => {
  const { children } = props;

  const { isPc } = useTabletSize();

  return (
    <StyledLoginJoinLayout isPc={isPc}>
      {children}
      {isPc && <StyledImageArea imgUrl={loginImg} />}
    </StyledLoginJoinLayout>
  );
};
