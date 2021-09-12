import { useRouter } from 'next/router';

import { Form, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import styled from 'styled-components';

import { LoginJoinLayout, LoginJoinFormInput } from 'components';

import { useTabletSize } from 'lib/hooks';
import { LOGIN } from 'lib/routers';

import { joinApi } from 'apis/auth';

const StyledJoin = styled.div<{ isPc: boolean }>`
  width: ${props => (props.isPc ? '50%' : '100%')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    font-size: 2rem;
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
  background-color: #000000 !important;
  color: white !important;
  font-weight: bold;
  width: 100%;
  border: none;
  height: 82px;
  margin-top: 50px;
  font-size: 1.5rem;
`;

export const JoinForm = () => {
  const { isPc } = useTabletSize();
  const router = useRouter();

  const [form] = useForm();

  const handleSubmit = async values => {
    const { id, pw } = values;

    await joinApi(id, pw);
    router.push(LOGIN);
  };

  return (
    <LoginJoinLayout>
      <StyledJoin isPc={isPc}>
        <h2>JOIN</h2>
        <StyledJoinForm onFinish={handleSubmit} form={form}>
          <LoginJoinFormInput
            name="id"
            label="ID"
            rules={[
              { required: true, message: '이메일을 입력해주세요' },
              { type: 'email', message: 'email 형식에 맞지 않습니다.' },
            ]}
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
              type: 'password',
            }}
          />
          <LoginJoinFormInput
            name="cpw"
            label="CPW"
            rules={[
              { required: true, message: '비밀번호 확인을 입력해주세요' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('pw') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호와 일치하지 않습니다.'));
                },
              }),
            ]}
            inputProps={{
              placeholder: '비밀번호 확인',
              type: 'password',
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
