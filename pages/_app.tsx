import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "@css/theme";
import { GlobalStyle } from "@css/GlobalStyle";
import { NextPageWithLayout } from "../src/type/page";

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
}

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
    const getLayout = Component.getLayout || (page => page);

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    );
};

export default App;
