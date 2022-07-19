import { CSSObject } from "styled-components";

const createTypeface = (
    fontSize: string,
    lineHeight: string | number,
    letterSpacing: string | number
): CSSObject => ({
    fontSize,
    lineHeight,
    letterSpacing,
});

export const typefaces = {
    display3Xl: createTypeface("9.6rem", 1.15, "-0.3rem"),
    display2Xl: createTypeface("7.2rem", 1.1, "-0.2rem"),
    displayXl: createTypeface("6rem", 1.1, "-0.2rem"),
    displayLg: createTypeface("4.8rem", 1.1, "-0.2rem"),
    displayMd: createTypeface("3.6rem", 1.1, "-0.1rem"),
    displaySm: createTypeface("3rem", 1.1, "-0.1rem"),
    displayXs: createTypeface("2.4rem", 1.1, "-0.1rem"),
    textXl: createTypeface("2rem", 1.4, "-0.02rem"),
    textLg: createTypeface("1.8rem", 1.4, "-0.02rem"),
    textMd: createTypeface("1.6rem", 1.4, "-0.01rem"),
    textSm: createTypeface("1.4rem", 1.4, "-0.01rem"),
    textXs: createTypeface("1.2rem", 1.4, "0"),
} as const;

export type Typeface = keyof typeof typefaces;
