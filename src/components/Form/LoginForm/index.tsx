import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userEmailState } from 'recoil/auth';

import styled from 'styled-components';
import { Button, Form } from 'antd';

import { LoginJoinFormInput, LoginJoinLayout } from 'components';
import { useTabletSize } from 'lib/hooks';
import { loginApi } from 'apis/auth';

const StyledLogin = styled.div<{ isPc: boolean }>`
  width: ${props => (props.isPc ? '50%' : '100%')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p {
    font-size: 23px;
    font-weight: bold;
  }
`;

const StyledLoginForm = styled(Form)`
  margin: auto;
  .ant-form-item-explain.ant-form-item-explain-error {
    position: absolute;
    top: 100px;
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
  background-color: black !important;
  color: white !important;
  font-weight: bold;
  width: 100%;
  border: none;
  height: 82px;
`;

export const LoginForm = () => {
  const setUserEmailState = useSetRecoilState(userEmailState);

  const { isPc } = useTabletSize();
  const router = useRouter();

  const handleClickJoin = useCallback(() => {
    router.push('join');
  }, []);

  const handleSubmit = useCallback(
    async values => {
      const { id, pw } = values;

      const userEmail = await loginApi(id, pw);

      if (userEmail) {
        router.push('/');
        setUserEmailState(userEmail);
      }
    },
    [loginApi],
  );

  return (
    <LoginJoinLayout>
      <StyledLogin isPc={isPc}>
        <p>LOGIN</p>
        <StyledLoginForm onFinish={handleSubmit}>
          <LoginJoinFormInput
            name="id"
            label="ID"
            rules={[
              { required: true, message: 'ID를 입력해주세요' },
              {
                type: 'email',
                message: 'email 형식에 맞지 않습니다.',
              },
            ]}
          />
          <LoginJoinFormInput
            name="pw"
            label="PW"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
            inputProps={{
              type: 'password',
            }}
          />
          <StyledLoginExtraArea>
            <div onClick={handleClickJoin}>회원가입</div>
            <div>아이디/비밀번호 찾기</div>
          </StyledLoginExtraArea>
          <Form.Item>
            <StyledLoginButton htmlType="submit">로그인</StyledLoginButton>
          </Form.Item>
        </StyledLoginForm>
      </StyledLogin>
    </LoginJoinLayout>
  );
};
