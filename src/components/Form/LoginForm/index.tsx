import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userEmailState } from 'recoil/auth';

import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

import { JOIN, MAIN } from 'lib/routers';

import { loginApi } from 'apis/auth';
import { theme } from 'styles/Theme';
import { userState } from 'recoil/user';

const Container = styled.div`

`;


const StyledLoginJoinFormInput = styled(Form.Item)`
  border-bottom: 1px solid ${theme.gray};
  .password {
    margin-bottom: 2.5rem;
  }
`;

const StyledLogin = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const StyledLoginForm = styled(Form)`
  /* margin: auto; */
  width: 100%;
`;

const StyledLoginButton = styled(Button)`
width: 100%;
/* background-color: ${theme.black} !important; */
background-color: #273617 !important;
color: ${theme.white};
border: none;
font-size: ${theme.size_18} !important; 
font-weight: ${theme.weight_bold};
height: 50px !important;
`;

export const LoginForm = () => {
  const setUserEmailState = useSetRecoilState(userEmailState);
  const setUserState = useSetRecoilState(userState);

  const router = useRouter();

  const handleSubmit = useCallback(
    async values => {
      const { id, pw } = values;

      const userEmail = await loginApi(id, pw);

      if (userEmail) {
        router.push(MAIN);
        setUserState(userEmail)
      }
    },
    // [loginApi],
    [],
  );

  return (
    <Container>
      <StyledLoginForm onFinish={handleSubmit}>

        <StyledLoginJoinFormInput
          name="id"
          rules={[
            { required: true, message: 'ID를 입력해주세요' },
            {
              type: 'email',
              message: 'email 형식에 맞지 않습니다.',
            },
          ]}
          hasFeedback={true}
        >
          <Input placeholder='이메일을 입력해주세요.' bordered={false} />
        </StyledLoginJoinFormInput>

        <StyledLoginJoinFormInput
          className='password'
          name="pw"
          hasFeedback={true}
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        >
          <Input.Password placeholder='비밀번호를 입력해주세요.' bordered={false} />
        </StyledLoginJoinFormInput>

        <Form.Item>
          <StyledLoginButton shape='round' size='large' htmlType="submit">로그인</StyledLoginButton>
        </Form.Item>

      </StyledLoginForm>
    </Container>
  );
};
