import { ThemeProvider } from "styled-components";
import "../styles/globals.css";

const them = {
    testColor: "#ff4c01",
};
function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={them}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
