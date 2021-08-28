import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import 'antd/dist/antd.css';
import { initFirebase } from 'utils/initFirebase';

const them = {
  testColor: '#ff4c01',
};

initFirebase();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={them}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
