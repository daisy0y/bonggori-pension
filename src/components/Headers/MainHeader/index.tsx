import styled from 'styled-components';
import { LoginButton, MainNav } from 'components';

const StyledMainHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;

  div {
    display: flex;
  }
`;

export const MainHeader = () => {
  return (
    <StyledMainHeader>
      <div>
        <h1 id="logo">BGR</h1>
        <MainNav />
      </div>
      <LoginButton />
    </StyledMainHeader>
  );
};
