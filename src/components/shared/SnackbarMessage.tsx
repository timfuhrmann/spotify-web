import React, { forwardRef } from "react";
import { SnackbarMessage as SnackbarMessageType } from "notistack";
import styled from "styled-components";
import { text } from "@css/helper/typography";

const MessageWrapper = styled.div`
    background-color: ${p => p.theme.blue300};
    color: ${p => p.theme.gray900};
    padding: 1.2rem 2.4rem;
    border-radius: 0.4rem;
    ${text("textMd", "medium")}
`;

interface SnackbarMessageProps {
    message: SnackbarMessageType;
}

export const SnackbarMessage = forwardRef<HTMLDivElement, SnackbarMessageProps>(
    ({ message }, ref) => {
        return <MessageWrapper ref={ref}>{message}</MessageWrapper>;
    }
);
