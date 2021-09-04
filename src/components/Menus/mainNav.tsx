//base
import React from 'react';

//import
import styled from 'styled-components';

//model
import { mainNavList } from 'import';

const StyledMainNav = styled.nav`
  ul {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 30px;
  }
`;
export const MainNav = () => {
  return (
    <StyledMainNav>
      <ul>
        {mainNavList.map(nav => (
          <li>{nav.name}</li>
        ))}
      </ul>
    </StyledMainNav>
  );
};
