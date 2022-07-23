import React, { SVGProps } from "react";

export const ChevronBottom: React.FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
            <path fill="currentColor" d="M14 6l-6 6-6-6h12z"></path>
        </svg>
    );
};
