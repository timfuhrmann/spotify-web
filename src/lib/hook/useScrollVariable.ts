import React from "react";

export const useScrollVariable = () => {
    return (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget;
        target.style.setProperty("--scroll", target.scrollTop.toString());
    };
};
