import styled from 'styled-components';

import { CommonButton } from '../CommonButton';

interface StyledBoardButtonsProps {
  isPc: boolean;
}

interface BoardButtonsProps {
  handleRemove: () => void;
  handleModify: () => void;
  handleAnswer: () => void;
  isMine: boolean;
  isAdmin: boolean;
  isPc: boolean;
}

const StyledBoardButtons = styled.div<StyledBoardButtonsProps>`
  display: flex;
  flex-direction: ${props => (props.isPc ? 'column' : 'row')};
  margin-top: ${props => !props.isPc && '10px'};
  .button-styled {
    ${props => (props.isPc ? `margin-bottom: 10px;` : `margin-right: 10px;`)}
  }
`;

export const BoardButtons = (props: BoardButtonsProps) => {
  const { handleRemove, handleModify, handleAnswer, isMine, isAdmin, isPc } = props;

  return (
    <StyledBoardButtons isPc={isPc}>
      {isMine && (
        <>
          <CommonButton className="button-styled" onClick={handleRemove}>
            삭제
          </CommonButton>
          <CommonButton className="button-styled" onClick={handleModify}>
            수정
          </CommonButton>
        </>
      )}
      {isAdmin && <CommonButton onClick={handleAnswer}>답변</CommonButton>}
    </StyledBoardButtons>
  );
};
