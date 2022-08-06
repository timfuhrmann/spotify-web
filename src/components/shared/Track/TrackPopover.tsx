import React from "react";
import styled from "styled-components";
import { Popover } from "../Popover/Popover";
import { useClickOutside } from "@lib/hook/useClickOutside";
import { PopoverPosition } from "./Track";
import { usePlaybackQueueMutation } from "@lib/api/player/usePlaybackQueueMutation";
import { Link } from "@lib/link";

const PopoverWrapper = styled.div`
    position: fixed;
    z-index: 20;
`;

const PopoverButton = styled.button`
    width: 100%;
`;

const PopoverAnchor = styled.a`
    width: 100%;
`;

interface TrackPopoverProps {
    uri: string;
    position: PopoverPosition;
    isSaved: boolean;
    artists?: SpotifyApi.ArtistObjectSimplified[];
    onClose: () => void;
    onSaveTrack: () => void;
    onRemoveTrack: () => void;
}

//@todo add div, get position from provider
export const TrackPopover: React.FC<TrackPopoverProps> = ({
    uri,
    position,
    isSaved,
    artists,
    onClose,
    onSaveTrack,
    onRemoveTrack,
}) => {
    const ref = useClickOutside<HTMLDivElement>({ callback: onClose });
    const { mutate: mutateQueue } = usePlaybackQueueMutation();

    const handleQueue = () => {
        mutateQueue({ uri });
        onClose();
    };

    const handleSaveTrack = () => {
        onSaveTrack();
        onClose();
    };

    const handleRemoveTrack = () => {
        onRemoveTrack();
        onClose();
    };

    return (
        <PopoverWrapper ref={ref} style={{ top: position.y, left: position.x }}>
            <Popover onClose={onClose}>
                <Popover.Item>
                    <PopoverButton type="button" onClick={handleQueue}>
                        Add to queue
                    </PopoverButton>
                </Popover.Item>
                <Popover.Separator />
                {artists && artists.length > 0 && (
                    <Popover.Item>
                        <Link label="Go to artist" href={"/artist/" + artists[0].id}>
                            <PopoverAnchor>Go to artist</PopoverAnchor>
                        </Link>
                    </Popover.Item>
                )}
                <Popover.Item>
                    {isSaved ? (
                        <PopoverButton type="button" onClick={handleRemoveTrack}>
                            Remove from your liked songs
                        </PopoverButton>
                    ) : (
                        <PopoverButton type="button" onClick={handleSaveTrack}>
                            Save to your liked songs
                        </PopoverButton>
                    )}
                </Popover.Item>
                <Popover.Item>
                    <div>Add to playlist</div>
                </Popover.Item>
                <Popover.Separator />
                <Popover.Item>
                    <Link label="Open in desktop app" href={uri}>
                        <PopoverAnchor>Open in desktop app</PopoverAnchor>
                    </Link>
                </Popover.Item>
            </Popover>
        </PopoverWrapper>
    );
};
