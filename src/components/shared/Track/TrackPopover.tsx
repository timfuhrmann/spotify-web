import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Popover } from "../Popover/Popover";
import { useClickOutside } from "@lib/hook/useClickOutside";
import { PopoverPosition } from "./Track";
import { usePlaybackQueueMutation } from "@lib/api/player/mutation/usePlaybackQueueMutation";
import { Link } from "@lib/link";
import { useRootPlaylistsQuery } from "@lib/api/playlist/query/useRootPlaylistsQuery";
import { useAddTracksToPlaylistMutation } from "@lib/api/player/mutation/useAddTracksToPlaylistMutation";
import { useSession } from "@lib/context/session";
import { useRouter } from "next/router";

const PopoverWrapper = styled.div`
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
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

export const TrackPopover: React.FC<TrackPopoverProps> = ({
    uri,
    position,
    isSaved,
    artists,
    onClose,
    onSaveTrack,
    onRemoveTrack,
}) => {
    const { push } = useRouter();
    const { session } = useSession();
    const ref = useClickOutside<HTMLDivElement>({ callback: onClose });
    const [playlistPopover, setPlaylistPopover] = useState<boolean>(false);
    const [artistsPopover, setArtistsPopover] = useState<boolean>(false);
    const { data: playlists } = useRootPlaylistsQuery();
    const { mutate: mutateQueue } = usePlaybackQueueMutation();
    const { mutate: mutatePlaylist } = useAddTracksToPlaylistMutation();

    const playlistOptions = useMemo(() => {
        if (!playlists || !session) {
            return null;
        }

        return playlists.reduce((acc, playlist) => {
            if (playlist.owner.id !== session.id) {
                return acc;
            }

            acc[playlist.id] = playlist.name;
            return acc;
        }, {} as Record<string, string>);
    }, [session, playlists]);

    const artistOptions = useMemo(() => {
        if (!artists) {
            return null;
        }

        return artists.reduce((acc, artist) => {
            acc[artist.id] = artist.name;
            return acc;
        }, {} as Record<string, string>);
    }, [artists]);

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

    return ReactDOM.createPortal(
        <PopoverWrapper ref={ref} style={{ top: position.y, left: position.x }}>
            <Popover onClose={onClose}>
                <Popover.Item>
                    <PopoverButton
                        type="button"
                        onClick={handleQueue}
                        onMouseEnter={() => setArtistsPopover(false)}>
                        Add to queue
                    </PopoverButton>
                </Popover.Item>
                <Popover.Separator />
                {artists && artists.length > 0 && (
                    <React.Fragment>
                        {artists.length > 1 ? (
                            <Popover.List
                                open={artistsPopover}
                                label="Go to artist"
                                options={artistOptions}
                                onOpen={() => setArtistsPopover(true)}
                                onClose={() => setArtistsPopover(false)}
                                onSelect={id => push("/artist/" + id)}
                            />
                        ) : (
                            <Popover.Item>
                                <Link label="Go to artist" href={"/artist/" + artists[0].id}>
                                    <PopoverAnchor>Go to artist</PopoverAnchor>
                                </Link>
                            </Popover.Item>
                        )}
                    </React.Fragment>
                )}
                <Popover.Item>
                    {isSaved ? (
                        <PopoverButton
                            type="button"
                            onClick={handleRemoveTrack}
                            onMouseEnter={() => {
                                setPlaylistPopover(false);
                                setArtistsPopover(false);
                            }}>
                            Remove from your liked songs
                        </PopoverButton>
                    ) : (
                        <PopoverButton
                            type="button"
                            onClick={handleSaveTrack}
                            onMouseEnter={() => {
                                setPlaylistPopover(false);
                                setArtistsPopover(false);
                            }}>
                            Save to your liked songs
                        </PopoverButton>
                    )}
                </Popover.Item>
                <Popover.List
                    open={playlistPopover}
                    label="Add to playlist"
                    options={playlistOptions}
                    onOpen={() => setPlaylistPopover(true)}
                    onClose={() => setPlaylistPopover(false)}
                    onSelect={id => {
                        onClose();
                        mutatePlaylist({ playlistId: id, uris: [uri] });
                    }}
                />
                <Popover.Separator />
                <Popover.Item>
                    <Link label="Open in desktop app" href={uri}>
                        <PopoverAnchor onMouseEnter={() => setPlaylistPopover(false)}>
                            Open in desktop app
                        </PopoverAnchor>
                    </Link>
                </Popover.Item>
            </Popover>
        </PopoverWrapper>,
        document.body
    );
};
