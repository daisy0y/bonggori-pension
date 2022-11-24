import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import styled from 'styled-components';

import { MainNav } from 'components';
import { ArrowLeftOutlined, CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { theme } from 'styles/Theme';
import { Drawer } from 'antd';
import Link from 'next/link';
import { HEADER_BLACK_LIST } from 'lib/constants';
import { isLoginSelector, userState } from 'recoil/user';

const StyledMainHeader = styled.header`
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
  const router = useRouter();
  const isLogin = useRecoilValue(isLoginSelector);

  const path = router.pathname;
  const [open, setOpen] = useState(false);
  const checkHeaderColor = HEADER_BLACK_LIST.includes(path)
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };



  return (
    <StyledMainHeader >
      <div className="header-list-container">
        {path !== '/' && <ArrowLeftOutlined style={{ fontSize: '1.2rem', color: checkHeaderColor ? theme.black : theme.white }} onClick={() => router.back()} />}

        <MenuOutlined onClick={showDrawer} style={{ fontSize: '1.2rem', color: checkHeaderColor ? theme.black : theme.white, position: 'absolute', top: 20, right: 20 }} />

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
        <MainNav isLogin={isLogin} path={path} handleMenuToggle={onClose} />
      </Drawer>
    </StyledMainHeader>
  );
};
