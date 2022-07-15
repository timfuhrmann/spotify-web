export const theme = {
    //region Color
    black: "#191414",
    gray50: "#252525",
    gray75: "#2f2f2f",
    gray100: "#323232",
    gray200: "#3e3e3e",
    gray300: "#4a4a4a",
    gray400: "#5a5a5a",
    gray500: "#6e6e6e",
    gray600: "#909090",
    gray700: "#b9b9b9",
    gray800: "#e3e3e3",
    gray900: "#ffffff",

    primary100: "#1fdf64",
    primary200: "#1db954",
    primary400: "#169c46",
    //endregion

    //region Breakpoints
    bp: {
        intrinsic: 0,
        s: 524, // phone
        m: 768, // tablet
        l: 1024, // small laptop
        xl: 1250, // laptop
        xxl: 1440, // desktop
    },
    //endregion

    //region Content Width
    contentWidth: {
        intrinsic: "calc(100vw - 3.2rem)",
        s: "calc(100vw - 3.2rem)",
        m: "calc(100vw - 12rem)",
        l: "calc(100vw - 12rem)",
        xl: "calc(100vw - 19rem)",
        xxl: "125rem",
    },
    //endregion
};

type Theme = typeof theme;

declare module "styled-components" {
    export interface DefaultTheme extends Theme {}
}
