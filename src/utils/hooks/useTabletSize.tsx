import { useEffect } from 'react';
import { useState } from 'react';

export const useTabletSize = () => {
  const [windowWidth, setWindowWidth] = useState<number>(undefined);
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
