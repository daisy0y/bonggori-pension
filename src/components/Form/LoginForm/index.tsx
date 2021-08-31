import styled from 'styled-components';
import { Button, Input } from 'antd';

import loginImg from 'assets/img/login-img.jpeg';
import { useTabletSize } from 'utils/hooks/useTabletSize';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

const StyledLoginForm = styled.div<{ isPc: boolean }>`
  display: flex;
  height: 100vh;

  /* margin: ${props => (props.isPc ? 0 : 'auto')}; */
  .form-area {
    width: ${props => (props.isPc ? '50%' : '100%')};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
      font-size: 23px;
      font-weight: bold;
    }
  }
`;

const StyledLoginArea = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 10px;
`;

const StyledInPut = styled.div`
  border-bottom: 1px solid black;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  span {
    font-size: 25px;
    font-weight: bold;
    width: 40px;
  }
  input {
    width: 90%;
    font-size: 25px;
  }
`;

const StyledLoginExtraArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 130px;
  align-items: center;
`;

const StyledLoginButton = styled(Button)`
  width: 100%;
  background-color: black;
  color: white;
  height: 82px;
  font-size: 23px;
`;

const StyledImageArea = styled.div<{ imgUrl }>`
  background-image: url(${props => props.imgUrl.src});
  width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const LoginForm = () => {
  const { isPc } = useTabletSize();
  const router = useRouter();

  const handleClickJoin = useCallback(() => {
    router.push('join');
  }, []);

  return (
    <StyledLoginForm isPc={isPc}>
      <div className="form-area">
        <p>LOGIN</p>
        <StyledLoginArea>
          <StyledInPut>
            <span>ID</span>
            <Input bordered={false} placeholder="아이디를 입력해주세요" />
          </StyledInPut>
          <StyledInPut>
            <span>PW</span>
            <Input bordered={false} placeholder="비밀번호를 입력해주세요" />
          </StyledInPut>
          <StyledLoginExtraArea>
            <div onClick={handleClickJoin}>회원가입</div>
            <div>아이디/비밀번호 찾기</div>
          </StyledLoginExtraArea>
          <div>
            <StyledLoginButton>로그인</StyledLoginButton>
          </div>
        </StyledLoginArea>
      </div>
      {isPc && <StyledImageArea imgUrl={loginImg} />}
    </StyledLoginForm>
  );
};
