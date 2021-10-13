import React from 'react';

import styled from 'styled-components';

import { CommonButton } from 'components';

interface BoardHeaderProps {
  count: number;
  handleWriteSubmit: () => void;
  isLogin: boolean;
}

const StyledBoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  p.board-count {
    font-weight: bold;
  }

  @media screen and (max-width: 750px) {
    padding: 0 40px;
  }
`;

export const BoardHeader = (props: BoardHeaderProps) => {
  const { count = 0, handleWriteSubmit, isLogin } = props;

  return (
    <StyledBoardHeader>
      <p className="board-count">총 {count}개</p>
      {isLogin && <CommonButton onClick={handleWriteSubmit}>글쓰기</CommonButton>}
    </StyledBoardHeader>
  );
};
