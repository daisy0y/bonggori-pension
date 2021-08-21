import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import "antd/dist/antd.css";

const them = {
    testColor: "#ff4c01",
};
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
