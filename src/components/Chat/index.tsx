import React, { useEffect, useState, useRef } from 'react'

import { Messages } from 'components';

import { Form, Input, Spin } from 'antd';
import styled from 'styled-components'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { formatRelative } from 'date-fns';


interface ChatProps {
    messages: any;
    loading: boolean;
}
const StyledChat = styled.div`
    width: 20vw;
    height: 40vw;
    border: 1px solid #000;
    min-width: 250px;
    min-height: 500px;
    position: fixed;
    right: 10px;
    bottom: 10px;
    
    .chat-header {
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #000;
        padding-right: 20px;
        display: flex;
        align-items: center;
        text-align: right;
        justify-content: flex-end;
    }
    .message-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 20px;
    }
    
    .chat-input {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    .ant-form-item{
        margin:0;
    }

    .scroll-container {
        
    }

    .spin-wrapper {
        margin-left: 50%;
        margin-top: 50%;
    }
`;
export const Chat = () => {
    const [value, loading, error] = useCollectionData(firebase.firestore().collection('messages').orderBy('createdAt'));
    const [scrollTop, setScrollTop] = useState<number>();

    const [form] = Form.useForm();
    const [messageList, setMessasgeList] = useState<any>()
    const messageRef = useRef([])

    const handleSubmit = (e) => {
        firebase.firestore().collection('messages').add({
            text: e.message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userName: '외않되'
        })
        messageRef.current[1].scrollIntoView({ block: 'end', behavior: 'smooth' });
        form.setFieldsValue({ message: '' })
    }

    const formatDate = date => {
        let formattedDate = '';
        if (date) {
            formattedDate = formatRelative(date, new Date());
            formattedDate =
                formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
        return formattedDate;
    };

    const handleScroll = () => {
        const top = messageRef.current[0].scrollTop
        setScrollTop(top)
    };

    useEffect(() => {
        setMessasgeList(value)
    }, [value, messageList, handleSubmit])
    console.log(value)
    useEffect(() => {
        messageRef.current[1].scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, [messageList])

    useEffect(() => {
        if (scrollTop === 0) {
            // 첫 진입시에는 10개까지?만 보여주고 스크롤 0일떄마다 추가적으로 가지고 오기,
        }
    }, [scrollTop])

    return (
        <StyledChat>
            <header className='chat-header'>
                닫기
            </header>

            {loading && <Spin className='spin-wrapper' />}
            <div ref={(elem) => messageRef.current[0] = elem} style={{ overflowY: 'scroll', height: 'calc(40vw - 70px)', minHeight: '425px' }} onScroll={handleScroll} >
                <ul className='message-list' >

                    {
                        messageList?.map((e, i) => {
                            const date = e.createdAt?.seconds ? formatDate(new Date(e?.createdAt.seconds * 1000)) : null
                            return <Messages key={i} data={e} date={date} />
                        })
                    }
                </ul>
                <div ref={(elem) => messageRef.current[1] = elem} />
            </div>

            <Form form={form} onFinish={(e) => handleSubmit(e)}>
                <Form.Item name='message' className='chat-input'>
                    <Input />
                </Form.Item>
            </Form>

        </StyledChat>
    )
}