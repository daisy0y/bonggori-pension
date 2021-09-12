import React from 'react';

import { Avatar } from 'antd';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

interface MessagesProps {
  message: {
    text: string;
    userName: string;
    uid: string;
    id: string;
    createdAt: {
      nanoseconds: number;
      seconds: number;
    };
  };
  date: string;
  userId: string;
}

const StyledMessages = styled.li<{ msgStatus: string }>`
  all: unset;
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  .content-container {
    margin-left: 10px;
    flex: 8;
  }
  .user-name {
    font-weight: 700;
    margin-right: 10px;
  }
  .info-container {
    text-align: ${props => props.msgStatus === 'send' && 'right'};
  }
  .messasge-box {
    background: rgba(0, 0, 0, 0.05);
    width: 100%;
    border-radius: 5px;
    word-break: break-all;
    padding: 10px;
  }
  .styled-avatar {
    width: 32px;
    height: 32px;
    display: block;
  }
  .send {
    background: rgba(86, 113, 255);
    float: right;
    width: 80%;
    color: #fff;
  }
`;

export const Messages = (props: MessagesProps) => {
  const { message, date, userId } = props;
  const msgStatus = userId === message.uid ? 'send' : 'receive';
  return (
    <StyledMessages msgStatus={msgStatus}>
      {msgStatus === 'receive' && <Avatar className="styled-avatar" icon={<UserOutlined />} />}

      <div className="content-container">
        <div className="info-container">
          <span className="user-name">{msgStatus === 'receive' && message.userName}</span>
          <span>{date}</span>
        </div>
        <div className={`messasge-box ${msgStatus}`}>{message.text}</div>
      </div>
    </StyledMessages>
  );
};
