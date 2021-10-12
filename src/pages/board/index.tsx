import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { TableColumnsType } from 'antd';

import { BoardButtons, BoardHeader, Boards, BoardWrtieModal, CommonButton, PageHeader } from 'components';
import { useTabletSize } from 'lib/hooks';
import { boardDummy } from 'lib/constants';

const StyledBoardPage = styled.div`
  p.answer-complete {
    color: #ff4c01;
  }
  p.article-title {
    text-align: left;
  }
`;

const Board = () => {
  const [columns, setColumns] = useState<TableColumnsType>([]);
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const { isPc } = useTabletSize();
  const isLogin = true;
  const isAdmin = true;
  const isMine = true;

  const handleWriteModal = () => {
    setIsToggle(prev => !prev);
  };

  const handleSubmit = value => {
    console.log('글쓰기');
    console.log(value);
  };
  const handleRemove = () => {
    alert('글삭제');
  };

  const handleModify = () => {
    alert('글수정');
  };

  const handleAnswer = () => {
    alert('답변');
  };

  const windowResizeWatcher = () => {
    if (isPc) {
      setColumns([
        {
          align: 'center',
          title: '번호',
          dataIndex: 'no',
          key: 'no',
        },
        {
          align: 'center',
          width: '60%',
          title: '제목',
          dataIndex: 'boardTitle',
          key: 'boardTitle',
          render: value => <p className="article-title">{value}</p>,
        },
        {
          align: 'center',
          title: '답변',
          dataIndex: 'answer',
          key: 'answer',
          render: value => {
            if (value) {
              return <p className="answer-complete">답변 완료</p>;
            } else {
              return <p>확인중</p>;
            }
          },
        },
        {
          align: 'center',
          title: '날짜',
          dataIndex: 'created',
          key: 'created',
          render: value => <p>{new Date(value.seconds).toISOString().split('T')[0]}</p>,
        },
        {
          align: isMine && isAdmin ? 'left' : 'center',
          title: '작성자',
          dataIndex: 'writer',
          key: 'writer',
          render: (value, record) => {
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ margin: 'auto 0' }}>{value}</div>
                <BoardButtons
                  handleRemove={handleRemove}
                  handleModify={handleModify}
                  handleAnswer={handleAnswer}
                  isMine={isMine}
                  isAdmin={isAdmin}
                  isPc={isPc}
                />
              </div>
            );
          },
        },
      ]);
    } else {
      setColumns([
        {
          align: 'center',
          title: '번호',
          dataIndex: 'no',
          key: 'no',
          width: '10%',
        },
        {
          align: 'center',
          width: '60%',
          title: '제목',
          dataIndex: 'boardTitle',
          key: 'boardTitle',
          render: value => <p className="article-title">{value}</p>,
        },
        {
          align: 'right',
          title: '날짜',
          dataIndex: 'created',
          key: 'created',
          render: (value, record: any) => (
            <>
              <p>{new Date(value.seconds).toISOString().split('T')[0]}</p>
              <p>{record.writer}</p>
              {record.answer ? <p className="answer-complete">답변 완료</p> : <p>확인중</p>}
              <BoardButtons
                handleRemove={handleRemove}
                handleModify={handleModify}
                handleAnswer={handleAnswer}
                isMine={isMine}
                isAdmin={isAdmin}
                isPc={isPc}
              />
            </>
          ),
        },
      ]);
    }
  };

  useEffect(() => {
    windowResizeWatcher();
  }, [isPc]);

  return (
    <StyledBoardPage className="container">
      <PageHeader></PageHeader>
      <BoardHeader handleWriteSubmit={handleWriteModal} isLogin={isLogin} count={boardDummy.length}></BoardHeader>
      <Boards
        isPc={isPc}
        columns={columns}
        dataSource={boardDummy.map((data, i, array) => {
          data['no'] = array.length - i;
          return data;
        })}
      />
      <BoardWrtieModal
        isPc={isPc}
        isToggle={isToggle}
        handleWriteModal={handleWriteModal}
        handleSubmit={handleSubmit}
      />
    </StyledBoardPage>
  );
};

export default Board;
