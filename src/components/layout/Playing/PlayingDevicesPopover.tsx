import React, { useEffect } from "react";
import { Popover } from "../../shared/Popover/Popover";
import { usePlayer } from "@lib/player";
import styled from "styled-components";
import { text } from "@css/helper/typography";
import { useTransferPlaybackMutation } from "@lib/api/player/mutation/useTransferPlaybackMutation";
import { queryClient } from "@lib/api";

const PopoverHeadline = styled.div`
    padding: 2rem;
    ${text("textLg", "medium")};
    text-align: center;
    min-width: 25rem;
`;

const PopoverButton = styled.button<{ $active: boolean }>`
    flex-direction: column;
    width: 100%;
    color: ${p => (p.$active ? p.theme.primary200 : p.theme.gray900)};
`;

const PopoverName = styled.div`
    ${text("textSm", "medium")};
`;

const PopoverType = styled.div`
    ${text("textXs", "regular")};
    color: ${p => p.theme.gray700};
`;

interface PlayingDevicesPopoverProps {
    onClose: () => void;
}

export const PlayingDevicesPopover: React.FC<PlayingDevicesPopoverProps> = ({ onClose }) => {
    const { devices, activeDevice, device_id } = usePlayer();
    const { mutate: mutateTransfer } = useTransferPlaybackMutation();

    useEffect(() => {
        queryClient.invalidateQueries(["devices"]);
    }, []);

    const handleClick = (id: string) => {
        mutateTransfer({ device_ids: [id] });
        onClose();
    };

    if (!devices) {
        return null;
    }

    return (
        <Popover placement="top" onClose={onClose}>
            <PopoverHeadline>Connect to a device</PopoverHeadline>
            <Popover.Separator />
            {devices.map(
                device =>
                    device.id && (
                        <Popover.Item key={device.id}>
                            <PopoverButton
                                type="button"
                                $active={!!activeDevice && activeDevice.id === device.id}
                                onClick={() => device.id && handleClick(device.id)}>
                                <PopoverName>
                                    {device.id === device_id ? `This ${device.type}` : device.name}
                                </PopoverName>
                                <PopoverType>
                                    {device.id === device_id ? device.name : device.type}
                                </PopoverType>
                            </PopoverButton>
                        </Popover.Item>
                    )
            )}
        </Popover>
    );
};
