//base
import { RecoilRoot } from 'recoil';

//import
import { ThemeProvider } from 'styled-components';
import { initFirebase } from 'utils/initFirebase';
import 'antd/dist/antd.css';
import '../assets/reset.css';

//component
import { MainHeader, MainFooter, Chat } from '../components';
import React from 'react';

const them = {
  testColor: '#ff4c01',
};

initFirebase();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={them}>
      <RecoilRoot>
        <MainHeader />
        <Component {...pageProps} />
        <Chat />
        <MainFooter />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
