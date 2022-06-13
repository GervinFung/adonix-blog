import * as React from 'react';
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
} from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Layout from '../src/components/layout';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { AdonisAdmin, onAdminStateChanged } from '../src/auth';

const AdonixBlogContext = React.createContext({
    theme: {
        isDarkMode: false,
        setIsDarkMode: () => {},
    },
    admin: undefined as AdonisAdmin,
});

const App = ({ Component, pageProps }: AppProps) => {
    const key = 'isDarkMode';

    const [state, setState] = React.useState(
        React.useContext(AdonixBlogContext)
    );

    const {
        theme: { isDarkMode },
    } = state;

    React.useEffect(() => {
        if (window) {
            injectStyle();
        }
        const style = (color: string) =>
            `background: #282A36; color: ${color}; font-family:monospace; font-size: 2em`;
        console.log('%cBonjour?', style('#50FA7B'));
        const unsubscribe = onAdminStateChanged((admin) => {
            setState((prev) => ({
                ...prev,
                admin,
            }));
        });
        setState((prev) => ({
            ...prev,
            theme: {
                ...prev.theme,
                isDarkMode: (() => {
                    const isDarkMode = localStorage.getItem(key);
                    return isDarkMode
                        ? (JSON.parse(isDarkMode) as boolean)
                        : window.matchMedia('(prefers-color-scheme: dark)')
                              .matches;
                })(),
            },
        }));
        return unsubscribe;
    }, []);

    //ref: https://mui.com/material-ui/customization/typography/
    const theme = React.useMemo(
        () =>
            responsiveFontSizes(
                createTheme({
                    typography: {
                        fontFamily: 'JetBrains Mono',
                    },
                    palette: {
                        mode: isDarkMode ? 'dark' : 'light',
                    },
                    components: {
                        MuiCssBaseline: {
                            styleOverrides: `
                        @font-face {
                          font-family: 'JetBrains Mono';
                          font-style: normal;
                          font-display: swap;
                      }`,
                        },
                    },
                })
            ),
        [isDarkMode]
    );

    return (
        <AdonixBlogContext.Provider
            value={{
                ...state,
                theme: {
                    ...state.theme,
                    setIsDarkMode: () => {
                        setState((prev) => {
                            const isDarkMode = !prev.theme.isDarkMode;
                            localStorage.setItem(
                                key,
                                JSON.stringify(isDarkMode)
                            );
                            return {
                                ...prev,
                                theme: {
                                    ...prev.theme,
                                    isDarkMode,
                                },
                            };
                        });
                    },
                },
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                    styles={`
                        *::-webkit-scrollbar {
                            width: 6px;
                        }
                        *::-webkit-scrollbar-track {
                            background-color: transparent !important;
                        }
                        *::-webkit-scrollbar-thumb {
                            border: 2px solid transparent;
                            background-clip: padding-box;
                            border-radius: 9999px;
                            background-color: gray;
                        }
                  `}
                />
                <ToastContainer />
                <Layout title="Adonix Blog">
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </AdonixBlogContext.Provider>
    );
};

export { AdonixBlogContext };
export default App;
