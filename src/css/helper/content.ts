import { css } from "styled-components";
import { Breakpoint, breakpoints } from "@css/helper/breakpoints";

type ContentWidth = Record<Breakpoint, string>;

export const content = (only?: Breakpoint[]) => css`
    ${p => handleContent(p.theme.contentWidth, only)};
`;

const contentCss = (width: string) => css`
    max-width: min(${width}, 160rem);
    margin-left: auto;
    margin-right: auto;
`;

const handleContent = (contentWidth: ContentWidth, only?: Breakpoint[]) => {
    const keys = only || breakpoints().keys;

    return keys.map(breakpoint => {
        const content = contentWidth[breakpoint];

        if (!content) {
            return;
        }

        return css`
            ${breakpoint === "s" &&
            contentWidth["intrinsic"] &&
            `${breakpoints().max("s")} {
                   ${contentCss(contentWidth["intrinsic"])}
            }`}

            ${breakpoints().min(breakpoint)} {
                ${contentCss(content)}
            }
        `;
    });
};
