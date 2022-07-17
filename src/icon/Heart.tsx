import React, { SVGProps } from "react";

export const Heart: React.FC<SVGProps<SVGSVGElement>> = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
            <path
                fill="currentColor"
                d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
        </svg>
    );
};
