import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const BodyWrapper = styled.div`
    position: relative;
    padding: 2.4rem 0;
    background-color: ${p => p.theme.gray50};
    isolation: isolate;

    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 25rem;
        background-color: var(--dominant-color, ${p => p.theme.gray100});
        background-image: linear-gradient(rgba(0, 0, 0, 0.7) 0%, ${p => p.theme.gray50} 100%);
    }
`;

export const ListBody: React.FC<PropsWithChildren> = ({ children }) => {
    return <BodyWrapper>{children}</BodyWrapper>;
};
