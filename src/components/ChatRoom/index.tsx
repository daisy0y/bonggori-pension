import React, { useEffect, useRef } from 'react';
import firebase from 'firebase';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Form, Input, Spin } from 'antd';
import { formatRelative } from 'date-fns';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { getSession } from 'lib/storage';

import { Messages } from 'components';

interface ChatRoomProps {
  handleToggle: () => void;
}

interface MessageTypes {
  text: string;
  userName: string;
  uid: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
}
const StyledChatRoom = styled.div`
  position: fixed;
  right: 40px;
  bottom: 30px;
  width: 20vw;
  min-width: 250px;
  min-height: 520px;
  height: 40vw;
  background-color: rgb(246, 246, 247);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  .chat-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    padding: 0 20px;
    background: linear-gradient(130deg, rgb(86, 152, 255) 0%, rgb(86, 152, 255) 50%, rgb(86, 113, 255)) 100% center;

    align-items: center;
    text-align: right;
    color: #fff;
    h2.chat-title {
      color: #fff;
    }
    .close-btn {
      all: unset;
      cursor: pointer;
    }
  }
  .message-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .ant-form-item {
    margin: 0;
  }

  .spin-wrapper {
    margin-left: 50%;
    margin-top: 50%;
  }

  .message-section {
    overflow-y: scroll;
    height: calc(40vw - 90px);
    min-height: 430px;
  }
`;

const StyledChatForm = styled(Form)`
  position: absolute;
  bottom: 0;
  right: 0;

  .button-container {
    position: relative;
    .submit-button {
      all: unset;
      position: absolute;
      top: 6px;
      right: 10px;
      color: rgb(86, 152, 255);
      font-size: 1.3rem;
    }
  }

  .input-container {
    position: relative;

    input.chat-input {
      width: 20vw;
      min-width: 250px;
      padding-right: 40px;
      border: 0;
      border-radius: 0 0 5px 5px;
      height: 50px;
    }
  }
`;
export const ChatRoom = (props: ChatRoomProps) => {
  const { handleToggle } = props;
  const [value, loading] = useCollection<MessageTypes>(
    firebase.firestore().collection('messages').orderBy('createdAt'),
  );
  const [user] = useAuthState(firebase.auth());

  const [form] = Form.useForm();
  const messageRef = useRef<HTMLDivElement>(null);
  const anonymous = getSession('anonymous');
  const userId = user ? user.uid : anonymous;

  const handleSubmit = formData => {
    if (!formData.message) {
      alert('메세지를 입력하세요');
    } else {
      firebase
        .firestore()
        .collection('messages')
        .add({
          text: formData.message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          userName: user ? user.email : anonymous,
          uid: userId,
        });
      messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      form.setFieldsValue({ message: '' });
    }
  };

  const formatDate = date => {
    let formattedDate = '';
    if (date) {
      formattedDate = formatRelative(date, new Date());
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };

  const removeChatData = (seconds: number, id: string) => {
    const now = new Date().getTime() / 1000;
    const messageDate = seconds;
    if (now - messageDate > 43200) {
      firebase.firestore().collection('messages').doc(id).delete();
    }
  };

  useEffect(() => {
    messageRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [value]);

  return (
    <StyledChatRoom>
      <header className="chat-header">
        <h2 className="chat-title">봉고리 펜션</h2>
        <button className="close-btn" onClick={handleToggle}>
          닫기
        </button>
      </header>

      {loading && <Spin className="spin-wrapper" />}

      <section className="message-section">
        <ul className="message-list">
          {value?.docs.map((msg, index) => {
            removeChatData(msg.data().createdAt?.seconds, msg.id);
            const message = {
              ...msg.data(),
              id: msg.id,
            };
            const date = message.createdAt?.seconds ? formatDate(new Date(message.createdAt?.seconds * 1000)) : null;
            return <Messages key={index} message={message} date={date} userId={userId} />;
          })}
        </ul>
        <div ref={messageRef} />
      </section>

      <StyledChatForm form={form} onFinish={formData => handleSubmit(formData)}>
        <Form.Item className="button-container">
          <Form.Item name="message" className="input-container">
            <Input className="chat-input" placeholder="무엇을 도와드릴까요?" autoFocus maxLength={120} />
          </Form.Item>
          <Button className="submit-button" htmlType="submit">
            <SendOutlined />
          </Button>
        </Form.Item>
      </StyledChatForm>
    </StyledChatRoom>
  );
};
