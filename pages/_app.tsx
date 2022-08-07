import React from "react";
import store from "@lib/redux";
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
import { Provider as ReduxProvider } from "react-redux";
import { PlayerProvider } from "@lib/player/PlayerProvider";
import { SnackbarProvider } from "notistack";

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
}

const App: React.FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
    const getLayout = Component.getLayout || (page => page);

    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <ReduxProvider store={store}>
                        <PlayerProvider>
                            <SnackbarProvider
                                maxSnack={1}
                                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                                <GlobalStyle />
                                {getLayout(<Component {...pageProps} />)}
                            </SnackbarProvider>
                        </PlayerProvider>
                    </ReduxProvider>
                </SessionProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
