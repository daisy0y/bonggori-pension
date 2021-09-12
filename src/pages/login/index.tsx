import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from 'recoil/auth';

import { LoginForm } from 'components';

const LoginPage = () => {
  const isLogin = useRecoilValue(isLoginSelector);
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  return <div>{isLogin ? <div>로그인 중</div> : <LoginForm />}</div>;
};

export default LoginPage;
