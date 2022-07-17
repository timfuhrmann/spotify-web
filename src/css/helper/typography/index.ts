import { css } from "styled-components";
import { Typeface, typefaces } from "@css/helper/typography/typefaces";
import { FontWeight, fontWeights } from "@css/helper/typography/weight";

export const text = (typeface: Typeface, weight: FontWeight = "regular") => css`
    ${typefaces[typeface]};
    font-weight: ${fontWeights[weight]};
`;
