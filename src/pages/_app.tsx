//base
import { RecoilRoot } from 'recoil';

//import
import { ThemeProvider } from 'styled-components';
import { initFirebase } from 'utils/initFirebase';
import 'antd/dist/antd.css';
import '../assets/reset.css';

//component
import { MainHeader, MainFooter } from '../components';

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
        <MainFooter />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
