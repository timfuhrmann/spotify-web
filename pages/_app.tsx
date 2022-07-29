import React from "react";
import "../src/css/font/stylesheet.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "@css/theme";
import { GlobalStyle } from "@css/GlobalStyle";
import { NextPageWithLayout } from "@type/page";
import { SessionProvider } from "@lib/context/session/SessionProvider";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@lib/api";

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
}

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
    const getLayout = Component.getLayout || (page => page);

    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <GlobalStyle />
                    {getLayout(<Component {...pageProps} />)}
                </SessionProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
