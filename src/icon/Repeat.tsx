import React, { SVGProps } from "react";
import { RepeatMode } from "@lib/redux/reducer/player";

interface RepeatProps extends Omit<SVGProps<SVGSVGElement>, "type"> {
    type: RepeatMode;
}

export const Repeat: React.FC<RepeatProps> = ({ type, ...props }) => {
    switch (type) {
        case "track":
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
                    <path
                        fill="currentColor"
                        d="M0 4.75A3.75 3.75 0 013.75 1h.75v1.5h-.75A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25z"></path>
                    <path
                        fill="currentColor"
                        d="M9.12 8V1H7.787c-.128.72-.76 1.293-1.787 1.313V3.36h1.57V8h1.55z"></path>
                </svg>
            );
        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
                    <path
                        fill="currentColor"
                        d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"></path>
                </svg>
            );
    }
};
