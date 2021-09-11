import { RecoilRoot } from 'recoil';

import { ThemeProvider } from 'styled-components';

import { MainHeader, MainFooter } from '../components';

import { initFirebase } from 'lib/initFirebase';

import 'antd/dist/antd.css';
import '../assets/reset.css';

const theme = {
  testColor: '#ff4c01',
};

initFirebase();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <MainHeader />
        <Component {...pageProps} />
        <MainFooter />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
