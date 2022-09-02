import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { hover } from "@css/helper";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    
    html, 
    body,
    #__next {
        height: 100%;
    }
    
    body {
        font-family: "Circular Std", Helvetica, Arial, sans-serif;
        display: flex;
        flex-direction: column;
        background-color: ${p => p.theme.gray50};
        color: ${p => p.theme.gray900};
        min-height: 60rem;
        overscroll-behavior: none;
      
        &::-webkit-scrollbar { 
            display: none;
        }
    }

    .custom-scrollbar > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle {
        background-color: ${p => p.theme.gray400};
      
        ${p => hover`
            background-color: ${p.theme.gray600};
        `};
      
        &.active {
            background-color: ${p => p.theme.gray800};
        }
    }
`;
