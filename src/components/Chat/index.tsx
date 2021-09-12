import React, { useState } from 'react';
import styled from 'styled-components';
import { WechatOutlined } from '@ant-design/icons';
import { ChatRoom } from 'components/ChatRoom';

const StyledChat = styled.div`
  .chat-button {
    position: fixed;
    bottom: 40px;
    right: 60px;
    font-size: 3rem;
    color: rgb(86, 152, 255);
    cursor: pointer;
  }
`;

export const Chat = () => {
  const [isToggle, setIsToggle] = useState(false);
  const handleToggle = () => {
    setIsToggle(prev => !prev);
  };
  return (
    <StyledChat>
      {isToggle ? (
        <ChatRoom handleToggle={handleToggle} />
      ) : (
        <WechatOutlined className="chat-button" onClick={handleToggle} />
      )}
    </StyledChat>
  );
};
