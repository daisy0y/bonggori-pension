//base
import { RecoilRoot, useRecoilState } from 'recoil';

import styled, { ThemeProvider } from 'styled-components';

import { MainHeader, MainFooter, Loading, Chat } from 'components';

import 'antd/dist/antd.css';
import '../assets/reset.css';
import 'styles/globals.css';
import { theme } from 'styles/Theme';
import Head from 'next/head';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import firebase from 'lib/firebase';
import { deleteSession, generateString, getSession, setSession } from 'lib/storage';
import { userState } from 'recoil/user';
import AuthProvider from 'recoil/AuthProvider';

function MyApp({ Component, pageProps }) {


  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      </Head>

      <RecoilRoot>
        <AuthProvider />

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
