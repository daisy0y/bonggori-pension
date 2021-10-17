import Link from 'next/link';

import styled from 'styled-components';

import { LoginButton } from 'components';
import { MAIN_NAV_LIST } from 'lib/constants';

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
  display: flex;
  justify-content: space-between;
  ${props => !props.isPc && 'flex-direction: column;'};
  ul {
    ${props => !props.isPc && 'flex-direction: column;'};
    height: 100%;
    display: flex;
    align-items: center;
    ${props => props.isPc && 'margin-left: 30px'};
  }

  li.nav-list {
    font-size: 1.1rem;
    color: #000;
    transition: all 0.3s;
    cursor: pointer;
    ${props => !props.isPc && 'margin-bottom: 15px'};

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
          <li className={`nav-list ${path === nav.url ? 'active' : ''}`} key={idx}>
            <Link href={nav.url}>{nav.title}</Link>
          </li>
        ))}
      </ul>
      <ul>
        {isLogin && (
          <li className={`nav-list ${path === '/mypage' ? 'active' : ''}`}>
            <Link href="/mypage">MY PAGE</Link>
          </li>
        )}
        <li>
          <LoginButton handleMenuToggle={handleMenuToggle} />
        </li>
      </ul>
    </StyledMainNav>
  );
};
