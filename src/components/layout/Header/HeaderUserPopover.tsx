import React from "react";
import styled from "styled-components";
import { Popover } from "../../shared/Popover/Popover";
import { Link } from "@lib/link";
import { ExternalLink } from "@icon/ExternalLink";
import { useRouter } from "next/router";
import { usePlayer } from "@lib/player";

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
    const { push } = useRouter();
    const { player } = usePlayer();

    const handeLogout = () => {
        if (player) {
            player.disconnect();
        }

        return push("/api/auth/logout");
    };

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
                <UserAnchor as="button" type="button" onClick={handeLogout}>
                    Logout
                </UserAnchor>
            </Popover.Item>
        </Popover>
    );
};
