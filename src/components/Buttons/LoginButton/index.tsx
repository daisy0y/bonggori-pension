import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userEmailState } from 'recoil/auth';

import { CommonButton } from 'components';

import { logoutApi } from 'apis/auth';

import { LOGIN } from 'lib/routers';
import { isLoginSelector, userState } from 'recoil/user';

interface LoginButtonProps {
  handleMenuToggle: () => void;
}

export const LoginButton = (props: LoginButtonProps) => {
  const { handleMenuToggle } = props;
  const setUserEmailState = useSetRecoilState(userEmailState);
  const isLogin = useRecoilValue(isLoginSelector);
  const router = useRouter();
  const setUserState = useSetRecoilState(userState);

  const handleLoginLogout = useCallback(() => {
    if (isLogin) {
      const confirm = window.confirm('로그아웃 하시겠습니까?');
      if (confirm) {
        handleMenuToggle();
      } else {
        return;
      }
      logout();
    } else {
      router.push(LOGIN);
    }
    handleMenuToggle();
  }, [isLogin]);

  const logout = () => {
    logoutApi();
    setUserState(undefined)
  };

  return (
    <CommonButton className="login-btn" onClick={handleLoginLogout}>
      {isLogin ? '로그아웃' : '로그인'}
    </CommonButton>
  );
};
