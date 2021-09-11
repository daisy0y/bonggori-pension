import { RecoilRoot } from 'recoil';

import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';

import { initFirebase } from 'lib/initFirebase';

import { CustomHeader } from 'components';

const theme = {
  testColor: '#ff4c01',
};

initFirebase();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CustomHeader />
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
