import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'recoil/auth';

import styled from 'styled-components';

import { MAIN } from 'lib/routers';
import { MainNav } from 'components';
import { useTabletSize } from 'lib/hooks';
import { CommonButton } from 'components/Buttons';

interface StyledMainHeaderProps {
  isPc: boolean;
  menuButtonToggle: boolean;
}

const StyledMainHeader = styled.header<StyledMainHeaderProps>`
  position: sticky;
  top: 0;
  z-index: 9999;
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  ${props => props.isPc && `border-bottom: 1px solid #c8c8c8;`};

  #logo {
    cursor: pointer;
    display: block;
  }

  .header-list-container {
    width: 100%;
    display: flex;
  }

  .mobile-menu {
    padding-top: ${props => props.menuButtonToggle && '48%'};
    height: ${props => (props.menuButtonToggle ? 'calc(100vh - 80px)' : '0')};
    opacity: ${props => (props.menuButtonToggle ? '1' : '0')};
    transition: all 0.5s;
  }
`;

const StyledCommonButton = styled(CommonButton)`
  border: 0;
  box-shadow: none;
  font-size: 1.1rem;
  font-weight: 600;
  margin: auto 0;
  position: absolute;
  right: 10px;
`;

export const MainHeader = () => {
  const [menuButtonToggle, setMenuButtonToggle] = useState<boolean>(false);
  const { isPc } = useTabletSize();
  const router = useRouter();
  const isLogin = useRecoilValue(isLoginSelector);
  const path = router.pathname;

  const handleMenuToggle = () => {
    setMenuButtonToggle(prev => !prev);
  };

  const handleGoMain = useCallback(() => {
    router.push(MAIN);
  }, []);

  const handleMovePage = useCallback((url: string) => {
    router.push(url);
    if (!isPc) {
      handleMenuToggle();
    }
  }, []);

  return (
    <StyledMainHeader isPc={isPc} menuButtonToggle={menuButtonToggle}>
      <div className="header-list-container">
        <h1 id="logo" onClick={handleGoMain}>
          BGR
        </h1>
        <StyledCommonButton onClick={handleMenuToggle}>{menuButtonToggle ? 'CLOSE' : 'MENU'}</StyledCommonButton>

        {isPc && (
          <MainNav
            isPc={isPc}
            isLogin={isLogin}
            handleMovePage={handleMovePage}
            path={path}
            setMenuButtonToggle={setMenuButtonToggle}
          />
        )}
      </div>

      {!isPc && (
        <div className="mobile-menu">
          <MainNav
            isPc={isPc}
            isLogin={isLogin}
            handleMovePage={handleMovePage}
            path={path}
            setMenuButtonToggle={setMenuButtonToggle}
          />
        </div>
      )}
    </StyledMainHeader>
  );
};
