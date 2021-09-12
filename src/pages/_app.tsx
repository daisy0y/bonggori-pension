import { RecoilRoot } from 'recoil';

import { ThemeProvider } from 'styled-components';
import { initFirebase } from 'utils/initFirebase';
import 'antd/dist/antd.css';
import '../assets/reset.css';

import { MainHeader, MainFooter, Loading } from 'components';

const them = {
  testColor: '#ff4c01',
};

initFirebase();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={them}>
      <RecoilRoot>
        <Loading />
        <MainHeader />
        <Component {...pageProps} />
        <MainFooter />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
