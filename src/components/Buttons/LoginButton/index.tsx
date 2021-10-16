import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginSelector, userEmailState } from 'recoil/auth';

import { CommonButton } from 'components';

import { logoutApi } from 'apis/auth';

import { LOGIN } from 'lib/routers';

interface LoginButtonProps {
  setMenuButtonToggle: (status: boolean) => void;
}

export const LoginButton = (props: LoginButtonProps) => {
  const { setMenuButtonToggle } = props;
  const setUserEmailState = useSetRecoilState(userEmailState);
  const isLogin = useRecoilValue(isLoginSelector);
  const router = useRouter();

  const handleLoginLogout = useCallback(() => {
    if (isLogin) {
      logout();
    } else {
      router.push(LOGIN);
      setMenuButtonToggle(false);
    }
  }, [isLogin]);

  const logout = () => {
    logoutApi();
    setUserEmailState(null);
  };

  return (
    <CommonButton className="login-btn" onClick={handleLoginLogout}>
      {isLogin ? '로그아웃' : '로그인'}
    </CommonButton>
  );
};
