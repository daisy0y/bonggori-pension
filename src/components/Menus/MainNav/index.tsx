import Link from 'next/link';

import styled from 'styled-components';

import { LoginButton } from 'components';
import { MAIN_NAV_LIST } from 'lib/constants';
import { theme } from 'styles/Theme';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface MainNavProps {
  handleMenuToggle: () => void;
  path: string;
  isLogin: boolean;
}


const StyledMainNav = styled.nav`
  width: 100%;
  max-width: ${theme.maxWidth};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ul {
    flex-direction: column;
    height: 100%;
    display: flex;
    align-items: center;
  }

  li.nav-list {
    font-size: 1.1rem;
    color: ${theme.white};
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      font-weight: 600;
      color: #1890ff;
      transition: all 0.3s;
    }
  }
  .active {
    color: #1890ff !important;
  }
`;

export const MainNav = (props: MainNavProps) => {
  const { handleMenuToggle, path, isLogin } = props;


  return (
    <StyledMainNav >
      <ul>
        {MAIN_NAV_LIST.map((nav, idx) => (
          <li className={`nav-list ${path === nav.url ? 'active' : ''}`} key={idx} onClick={handleMenuToggle}>
            <Link href={nav.url}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {isLogin && (
          <li className={`nav-list ${path === '/mypage' ? 'active' : ''}`} onClick={handleMenuToggle}>
            <Link href="/mypage">
              MY PAGE
            </Link>
          </li>
        )}
        <li>
          <LoginButton handleMenuToggle={handleMenuToggle} />
        </li>
      </ul>
    </StyledMainNav>
  );
};
