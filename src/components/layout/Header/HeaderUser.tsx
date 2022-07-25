import React, { useState } from "react";
import styled from "styled-components";
import { HeaderUserPopover } from "./HeaderUserPopover";
import { square } from "@css/helper";
import { useSession } from "@lib/context/session";
import { SpotifyImage } from "@lib/image";
import { ChevronBottom } from "@icon/ChevronBottom";
import { text } from "@css/helper/typography";

const UserWrapper = styled.div`
    pointer-events: auto;
`;

const UserButton = styled.button`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    background-color: ${p => p.theme.black};
    padding: 0.4rem 1.2rem 0.4rem 0.4rem;
    border-radius: 2rem;
    ${text("textSm", "bold")}
`;

const UserAvatar = styled.div`
    position: relative;
    ${square("2.8rem")};
    border-radius: 50%;
    background-color: ${p => p.theme.gray100};
    overflow: hidden;
    transform: translateZ(0);
`;

const UserChevron = styled(ChevronBottom)<{ $active: boolean }>`
    width: 1.6rem;
    transform: ${p => p.$active && "rotate(180deg)"};
`;

export const HeaderUser: React.FC = () => {
    const { session } = useSession();
    const [open, setOpen] = useState<boolean>(false);

    if (!session) {
        return null;
    }

    return (
        <UserWrapper>
            <UserButton onClick={() => setOpen(prevState => !prevState)}>
                <UserAvatar>
                    {session.images && (
                        <SpotifyImage images={session.images} alt="Avatar" sizes="28px" />
                    )}
                </UserAvatar>
                {session.display_name}
                <UserChevron $active={open} />
            </UserButton>
            {open && <HeaderUserPopover />}
        </UserWrapper>
    );
};
