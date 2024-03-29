import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { hover } from "@css/helper";
import { text } from "@css/helper/typography";

const withStyles = (
    Component: React.ComponentType<PropsWithChildren<{ className?: string }>>
) => styled(Component)`
    display: flex;
    padding: 1.2rem;
    border-radius: 0.4rem;
    white-space: nowrap;
    ${text("textMd", "regular")};

    ${p => hover`
        background-color: ${p.theme.gray200};
    `};
`;

export const PopoverItem = withStyles(({ children, className }) => {
    if (!React.isValidElement(children)) {
        return null;
    }

    return React.cloneElement(children, { className });
});
