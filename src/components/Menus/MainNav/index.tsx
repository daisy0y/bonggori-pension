import styled from 'styled-components';

const StyledMainNav = styled.nav`
  ul {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 30px;
  }
`;

const mainNavList = [
  { name: '객실안내', address: '/rooms' },
  { name: 'FAQ', address: '/faq' },
  { name: '실시간예약', address: '/booking' },
  { name: '정보안내', address: '/info' },
];

export const MainNav = () => {
  return (
    <StyledMainNav>
      <ul>
        {mainNavList.map((nav, idx) => (
          <li key={idx}>{nav.name}</li>
        ))}
      </ul>
    </StyledMainNav>
  );
};
