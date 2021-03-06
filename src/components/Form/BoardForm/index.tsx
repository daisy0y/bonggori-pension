import React, { useEffect } from 'react';

import styled from 'styled-components';
import { Form, Input } from 'antd';

import { CommonButton } from 'components';

interface BoardFormProps {
  isPc: boolean;
  handleWriteModal: () => void;
  handleSubmit: (value: any) => void;
}

interface StyledBoardFormProps {
  ispc: string;
}

const StyledBoardForm = styled(Form)<StyledBoardFormProps>`
  padding: 40px;
  width: 1024px;
  ${props => props.ispc === 'false' && 'height: 100%'};
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .form-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #000;
    margin-bottom: 40px;
  }

  .ant-input-prefix {
    font-size: 1.3rem;
    font-weight: 500;
  }

  p.board-title {
    position: absolute;
    z-index: 1;
  }

  p.content-title,
  p.board-title {
    font-size: 1.3rem;
    font-weight: 500;
    padding-left: 11px;
  }

  #boardContent {
    text-align: left;
    box-shadow: none;
    border-color: #f0f0f0;
    resize: none;
    height: 500px;
  }

  .input-styled {
    width: 640px;
    border: 0;

    &.title {
      border-bottom: 1px solid #000;
    }

    &.text-area {
      position: relative;
    }
  }

  .ant-input-textarea-show-count::after {
    position: absolute;
    top: -22px;
    right: 0;
  }

  .ant-input-affix-wrapper {
    border: 0;
    box-shadow: none;
  }

  .ant-input {
    align-self: end;
    text-align: right;
  }
`;

export const BoardForm = (props: BoardFormProps) => {
  const { isPc, handleWriteModal, handleSubmit } = props;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const CustomCommonButton = styled(CommonButton)`
    border: 0;
  `;
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  });

  return (
    <StyledBoardForm ispc={isPc.toString()} form={form} onFinish={handleSubmit}>
      <header className="form-header">
        <h1>글쓰기</h1>
        <CustomCommonButton onClick={handleWriteModal}>닫기</CustomCommonButton>
      </header>

      <Form.Item>
        <p className="board-title">제목</p>
        <Form.Item
          name="boardTitle"
          rules={[
            {
              required: true,
              message: '제목을 입력해주세요',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (30 < value.length) {
                  form.setFieldsValue({
                    boardTitle: getFieldValue('boardTitle').substr(0, 30),
                  });
                  return Promise.reject(new Error('최대 30글자까지 입력 할 수 있습니다.'));
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
          noStyle
        >
          <Input className="input-styled title" maxLength={30} />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <p className="content-title">내용</p>
        <Form.Item
          name="boardContent"
          rules={[
            { required: true, message: '내용을 입력해주세요' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (500 < value.length) {
                  form.setFieldsValue({
                    boardTitle: getFieldValue('boardContent').substr(0, 500),
                  });
                  return Promise.reject(new Error('최대 500글자까지 입력 할 수 있습니다.'));
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
          noStyle
        >
          <TextArea className="input-styled text-area" showCount maxLength={500} />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <CustomCommonButton htmlType="submit">글쓰기</CustomCommonButton>
      </Form.Item>
    </StyledBoardForm>
  );
};
