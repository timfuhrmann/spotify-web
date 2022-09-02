import React from "react";
import styled from "styled-components";
import { Popover } from "../../shared/Popover/Popover";
import { Link } from "@lib/link";
import { ExternalLink } from "@icon/ExternalLink";

const UserAnchor = styled.a`
    display: flex;
    justify-content: space-between;
    gap: 1.2rem;
    width: 100%;
`;

interface HeaderUserPopoverProps {
    onClose: () => void;
}

export const HeaderUserPopover: React.FC<HeaderUserPopoverProps> = ({ onClose }) => {
    return (
        <Popover placement="bottom-end" onClose={onClose}>
            <Popover.Item>
                <Link label="Download" href="https://www.spotify.com/de/download">
                    <UserAnchor target="_blank" rel="noreferrer noopener">
                        Download
                        <ExternalLink width="16" />
                    </UserAnchor>
                </Link>
            </Popover.Item>
            <Popover.Item>
                <UserAnchor href="/api/auth/logout">Logout</UserAnchor>
            </Popover.Item>
        </Popover>
    );
};
