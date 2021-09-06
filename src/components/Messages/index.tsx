import { Avatar } from 'antd';
import React from 'react'
import styled from 'styled-components'
import { UserOutlined } from '@ant-design/icons';

interface MessagesProps {
    data: {
        text: string;
        userName: string;
        createAt: {
            nanoseconds: number;
            seconds: number;
        }
    }
    date: string;
}

const StyledMessages = styled.li`
    
        all:unset;
        display: flex;
        margin-bottom: 10px;
            .content-container {
                margin-left: 10px;
                flex: 8;
            }
            .user-name {
                font-weight: 700;
                margin-right: 10px;
            }

            .messasge-box {
            background: #c8c8c8;
            width:100%;
            border-radius: 5px;
            padding: 5px;
            }
        


`;


export const Messages = (props: MessagesProps) => {
    const { data, date } = props;

    return (
        <StyledMessages>

            <Avatar style={{ width: 32, height: 32, display: 'block' }} icon={<UserOutlined />} />
            <div className='content-container'>
                <div>
                    <span className='user-name'>{data.userName}</span>
                    <span>{date}
                    </span>
                </div>
                <div className='messasge-box'>
                    {data.text}
                </div>
            </div>

        </StyledMessages>
    )
}


