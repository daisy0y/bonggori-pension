import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'recoil/auth';

import styled from 'styled-components';

import { MAIN } from 'lib/routers';
import { MainNav } from 'components';
import { useTabletSize } from 'lib/hooks';
import { CommonButton } from 'components/Buttons';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { theme } from 'styles/Theme';
import { Drawer } from 'antd';

interface StyledMainHeaderProps {
  isPc: boolean;
  menuButtonToggle: boolean;
}

const StyledMainHeader = styled.header<StyledMainHeaderProps>`
  position: fixed;
  width: 100%;
  max-width: ${theme.maxWidth};

  top: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;

  .header-list-container {
    width: 100%;
    max-width: ${theme.maxWidth};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

`;


export const MainHeader = () => {
  const [menuButtonToggle, setMenuButtonToggle] = useState<boolean>(false);
  const { isPc } = useTabletSize();
  const router = useRouter();
  const isLogin = useRecoilValue(isLoginSelector);
  const path = router.pathname;

  const handleMenuToggle = () => {
    if (!isPc) {
      setMenuButtonToggle(prev => !prev);
    }
  };

  const handleGoMain = useCallback(() => {
    router.push(MAIN);
  }, []);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <StyledMainHeader isPc={isPc} menuButtonToggle={menuButtonToggle}>
      <div className="header-list-container">

        <MenuOutlined onClick={showDrawer} style={{ fontSize: '1.2rem', color: theme.white }} />

      </div>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        closable={false}
        contentWrapperStyle={{ width: '100%', maxWidth: theme.maxWidth }}
        bodyStyle={{ background: theme.menuBackground }}
      >
        <div style={{ textAlign: 'right' }}>
          <CloseOutlined style={{ color: theme.white, fontSize: '1.2rem' }} onClick={onClose} />
        </div>
        <MainNav isPc={isPc} isLogin={isLogin} path={path} handleMenuToggle={handleMenuToggle} />
      </Drawer>
    </StyledMainHeader>
  );
};
