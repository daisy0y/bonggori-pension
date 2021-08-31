import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import 'antd/dist/antd.css';
import { initFirebase } from 'utils/initFirebase';
import { CustomHeader } from 'components';

const them = {
  testColor: '#ff4c01',
};

initFirebase();

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={them}>
      <RecoilRoot>
        <Head>
          <CustomHeader />
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
