import Link from 'next/link';

import styled from 'styled-components';

import { LoginButton } from 'components';
import { MAIN_NAV_LIST } from 'lib/constants';
import { theme } from 'styles/Theme';

interface MainNavProps {
  handleMenuToggle: () => void;
  path: string;
  isLogin: boolean;
  isPc: boolean;
}

interface StyledMainNavProps {
  isPc: boolean;
}

const StyledMainNav = styled.nav<StyledMainNavProps>`
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

    &:not(:last-child) {
      ${props => props.isPc && 'margin-right: 15px'};
    }
  }
  .active {
    color: #1890ff !important;
  }
`;

export const MainNav = (props: MainNavProps) => {
  const { handleMenuToggle, path, isLogin, isPc } = props;

  return (
    <StyledMainNav isPc={isPc}>
      <ul>
        {MAIN_NAV_LIST.map((nav, idx) => (
          <li className={`nav-list ${path === nav.url ? 'active' : ''}`} key={idx} onClick={handleMenuToggle}>
            <Link href={nav.url}>
              <a>{nav.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {isLogin && (
          <li className={`nav-list ${path === '/mypage' ? 'active' : ''}`} onClick={handleMenuToggle}>
            <Link href="/mypage">
              <a>MY PAGE</a>
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
