import React, { SVGProps } from "react";

export const More: React.FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
            <path
                fill="currentColor"
                d="M3 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM16 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
        </svg>
    );
};
