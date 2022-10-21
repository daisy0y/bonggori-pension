//base
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from 'styled-components';

import { MainHeader, MainFooter, Loading, Chat } from 'components';

import 'antd/dist/antd.css';
import '../assets/reset.css';
import 'styles/globals.css';
import { theme } from 'styles/Theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Loading />
        <MainHeader />
        <Component {...pageProps} />
        <Chat />
        {/* <MainFooter /> */}
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
