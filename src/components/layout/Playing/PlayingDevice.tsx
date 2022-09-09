import React from "react";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { content } from "@css/helper/content";
import { usePlayer } from "@lib/player";

const DeviceWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 2.6rem;
    background-color: ${p => p.theme.primary200};
    color: ${p => p.theme.gray50};
`;

const DeviceFrame = styled.div`
    display: flex;
    justify-content: flex-end;
    ${content()};
    width: 100%;
`;

const DeviceText = styled.div`
    ${text("textSm", "regular")};
    line-height: 1;
`;

export const PlayingDevice: React.FC = () => {
    const { activeDevice, device_id } = usePlayer();

    if (!activeDevice || activeDevice.id === device_id) {
        return null;
    }

    return (
        <DeviceWrapper>
            <DeviceFrame>
                <DeviceText>Listening on {activeDevice.name}</DeviceText>
            </DeviceFrame>
        </DeviceWrapper>
    );
};
