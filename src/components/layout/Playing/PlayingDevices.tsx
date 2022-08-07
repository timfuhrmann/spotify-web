import React, { useState } from "react";
import { Device } from "@icon/Device";
import styled from "styled-components";
import { hover } from "@css/helper";
import { usePlaying } from "./PlayingProvider";
import { usePlayer } from "@lib/player";
import { PlayingDevicesPopover } from "./PlayingDevicesPopover";
import { useClickOutside } from "@lib/hook/useClickOutside";

const DevicesWrapper = styled.div`
    position: relative;
    display: flex;
`;

const DevicesButton = styled.button<{ $highlighted: boolean }>`
    display: inline-flex;
    color: ${p => (p.$highlighted ? p.theme.primary300 : p.theme.gray700)};

    ${p => hover`
        color: ${p.$highlighted ? p.theme.primary200 : p.theme.gray900};
    `};

    &:disabled {
        pointer-events: none;
        color: ${p => p.theme.gray400};
    }
`;

export const PlayingDevices: React.FC = () => {
    const { isDisabled } = usePlaying();
    const { activeDevice, device_id } = usePlayer();
    const [popover, setPopover] = useState<boolean>(false);
    const ref = useClickOutside<HTMLDivElement>({ callback: () => setPopover(false) });

    return (
        <DevicesWrapper ref={ref}>
            {popover && <PlayingDevicesPopover onClose={() => setPopover(false)} />}
            <DevicesButton
                type="button"
                aria-label="Connect to a device"
                disabled={isDisabled}
                $highlighted={popover || (!!activeDevice && activeDevice.id !== device_id)}
                onClick={() => setPopover(prevState => !prevState)}>
                <Device width="16" aria-hidden />
            </DevicesButton>
        </DevicesWrapper>
    );
};
