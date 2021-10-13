import React from 'react';

import styled from 'styled-components';

import { BoardForm } from 'components';

interface BoardWrtieModalProps {
  isToggle: boolean;
  isPc: boolean;
  handleWriteModal: () => void;
  handleSubmit: (value: any) => void;
}

interface StyledBoardWrtieModal {
  isToggle: boolean;
}

const StyledBoardWrtieModal = styled.div<StyledBoardWrtieModal>`
  display: ${props => (props.isToggle ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

export const BoardWrtieModal = (props: BoardWrtieModalProps) => {
  const { isToggle, isPc, handleWriteModal, handleSubmit } = props;

  return (
    <StyledBoardWrtieModal isToggle={isToggle}>
      <BoardForm isPc={isPc} handleWriteModal={handleWriteModal} handleSubmit={handleSubmit} />
    </StyledBoardWrtieModal>
  );
};
