export const theme = {
    //region Color
    gray900: "#ffffff",
    gray800: "#fafafa",
    gray700: "#f5f5f5",
    gray600: "#eaeaea",
    gray500: "#e1e1e1",
    gray400: "#cacaca",
    gray300: "#b3b3b3",
    gray200: "#8e8e8e",
    gray100: "#6e6e6e",
    gray75: "#4b4b4b",
    gray50: "#2c2c2c",
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
