import React from "react";
import styled from "styled-components";
import { Popover } from "../../shared/Popover/Popover";
import { PopoverItem } from "../../shared/Popover/PopoverItem";
import { Link } from "@lib/link";
import { ExternalLink } from "@icon/ExternalLink";

const UserAnchor = styled.a`
    display: flex;
    justify-content: space-between;
    gap: 1.2rem;
`;

export const HeaderUserPopover: React.FC = () => {
    return (
        <Popover placement="bottom-end">
            <PopoverItem>
                <Link label="Download" href="https://www.spotify.com/de/download">
                    <UserAnchor target="_blank" rel="noreferrer noopener">
                        Download
                        <ExternalLink width="16" />
                    </UserAnchor>
                </Link>
            </PopoverItem>
            <PopoverItem>
                <Link label="Logout" href="/api/auth/logout">
                    <UserAnchor>Logout</UserAnchor>
                </Link>
            </PopoverItem>
        </Popover>
    );
};
