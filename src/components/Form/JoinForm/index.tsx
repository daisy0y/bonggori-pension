import { useRouter } from 'next/router';

import { Form, Button, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import styled from 'styled-components';


import { useTabletSize } from 'lib/hooks';
import { LOGIN } from 'lib/routers';
import { theme } from 'styles/Theme';
import { checkNickName, joinApi } from 'apis/auth';
import { useState } from 'react';

// import { joinApi } from 'apis/auth';
const StyledHeaderTextBox = styled.div`
  margin-bottom: 5rem;

  h1 {
    font-size: ${theme.size_30};
    font-weight: ${theme.weight_bold};
  }
  p {
    color: ${theme.gray};
    font-size: ${theme.size_16}
  }
`;
const Container = styled.div`
  padding: 6.875rem 2.5rem 1.875rem 2.5rem;
  .password {
    margin-bottom: 5rem;
  }
`;

const StyledJoinForm = styled(Form)`
  width: 100%;
  .ant-form-item-explain.ant-form-item-explain-error {
    position: absolute;
    top: 100px;
  }
`;

const StyledButton = styled(Button)`
width: 100%;
background-color: #273617 !important;
color: ${theme.white};
border: none;
font-size: ${theme.size_18} !important; 
font-weight: ${theme.weight_bold};
height: 50px !important;
`;


const StyledLoginJoinFormInput = styled(Form.Item)`
  border-bottom: 1px solid ${theme.gray};

`;

export const JoinForm = () => {
  const { isPc } = useTabletSize();
  const router = useRouter();
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async values => {
    const { id, pw, displayName } = values;
    try {
      setIsLoading(true)
      const checkNick = await checkNickName(displayName);
      if (!checkNick) {
        setIsLoading(false)
        return form.setFields([
          { name: 'displayName', errors: ['이미 사용하고 있는 별명입니다.'] }
        ])
      }

      const resultJoin = await joinApi(id, pw, displayName)

      console.log(resultJoin)
      setIsLoading(false)
      // await joinApi(id, pw);
      // router.push(LOGIN);
    } catch (error) {
      setIsLoading(false)
      message.error(error)
    }
  };

  return (
    <Container>
      <StyledHeaderTextBox>
        <h1>Join with Us! 🤗</h1>
        <p>빠르게 가입하고 이용해보세요.</p>
      </StyledHeaderTextBox>

      <StyledJoinForm onFinish={handleSubmit} form={form}>

        <StyledLoginJoinFormInput

          name="displayName"
          rules={[
            { required: true, message: '사용하실 별명을 입력해주세요.' },
            { min: 2, message: '2글자 이상 입력해주세요.' },
            { max: 10, message: '10글자 이하로 입력해주세요.' },
          ]}
          hasFeedback={true}
        >
          <Input placeholder='사용하실 별명을 입력해주세요.' bordered={false} />
        </StyledLoginJoinFormInput>


        <StyledLoginJoinFormInput
          name="id"
          rules={[
            { required: true, message: '이메일 주소를 입력해주세요.' },
            {
              type: 'email',
              message: 'email 형식에 맞지 않습니다.',
            },
          ]}
          hasFeedback={true}
        >
          <Input placeholder='이메일 주소를 입력해주세요.' bordered={false} />
        </StyledLoginJoinFormInput>

        <StyledLoginJoinFormInput
          className='password'
          name="pw"
          hasFeedback={true}
          rules={[{ required: true, message: '비밀번호를 입력해주세요' }, { min: 6, message: '비밀번호는 최소 6자 입니다.' }]}
        >
          <Input.Password placeholder='비밀번호를 입력해주세요.' bordered={false} />
        </StyledLoginJoinFormInput>

        {/* <LoginJoinFormInput
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
          /> */}
        <Form.Item>
          <StyledButton shape='round' size='large' htmlType="submit" loading={isLoading}>회원가입</StyledButton>

        </Form.Item>
      </StyledJoinForm>
    </Container>
  );
};
