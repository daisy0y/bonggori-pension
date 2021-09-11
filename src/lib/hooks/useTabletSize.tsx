import { useEffect, useState } from 'react';

export const useTabletSize = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isPc: windowWidth > 1024 };
};
