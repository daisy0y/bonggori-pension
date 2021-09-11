import { Form, Button } from 'antd';
import styled from 'styled-components';

import { LoginJoinLayout, LoginJoinFormInput } from 'components';
import { useTabletSize } from 'lib/hooks';

import React from 'react';
import { signUp } from 'lib/auth';

const StyledJoin = styled.div<{ isPc: boolean }>`
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

const StyledJoinForm = styled(Form)`
  margin: auto;
  .ant-form-item-explain.ant-form-item-explain-error {
    position: absolute;
    top: 100px;
  }
`;

const StyledButton = styled(Button)`
  background-color: black !important;
  color: white !important;
  font-weight: bold;
  width: 100%;
  border: none;
  height: 82px;
  margin-top: 50px;
`;

export const JoinForm = () => {
  const { isPc } = useTabletSize();

  const handleSubmit = async values => {
    const { id, pw } = values;
    try {
      await signUp(id, pw);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginJoinLayout>
      <StyledJoin isPc={isPc}>
        <p className="join-title">JOIN</p>
        <StyledJoinForm onFinish={handleSubmit}>
          <LoginJoinFormInput
            name="id"
            label="ID"
            rules={[{ required: true, message: '이메일을 입력해주세요' }]}
            inputProps={{
              placeholder: '이메일',
            }}
          />
          <LoginJoinFormInput
            name="pw"
            label="PW"
            rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
            inputProps={{
              placeholder: '비밀번호',
            }}
          />
          <LoginJoinFormInput
            name="cpw"
            label="CPW"
            rules={[{ required: true, message: '비밀번호 확인을 입력해주세요' }]}
            inputProps={{
              placeholder: '비밀번호 확인',
            }}
          />
          <Form.Item>
            <StyledButton htmlType="submit">가입하기</StyledButton>
          </Form.Item>
        </StyledJoinForm>
      </StyledJoin>
    </LoginJoinLayout>
  );
};
