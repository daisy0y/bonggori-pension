import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { CommonButton } from 'components';

export const LoginButton = () => {
  const router = useRouter();

  const handleGoLogin = useCallback(() => {
    router.push('/login');
  }, []);

  return (
    <CommonButton className="login-btn" onClick={handleGoLogin}>
      로그인
    </CommonButton>
  );
};
