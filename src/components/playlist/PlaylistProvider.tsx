import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { PlaylistProps } from "./Playlist";
import { followPlaylist, unfollowPlaylist } from "@lib/api/playlist";
import { useSession } from "@lib/context/session";
import { useRootPlaylists } from "@lib/context/root-playlists";

export type SafeTrack = Ensure<SpotifyApi.PlaylistTrackObject, "track">;

interface PlaylistContextData {
    isFollowing: boolean;
    tracks: SafeTrack[];
    totalTracks: number;
    handleFollowPlaylist: () => Promise<void>;
    handleUnfollowPlaylist: () => Promise<void>;
}

const PlaylistContext = createContext<PlaylistContextData>({} as PlaylistContextData);

export const PlaylistProvider: React.FC<PropsWithChildren<PlaylistProps>> = ({
    playlist,
    children,
}) => {
    const { access_token } = useSession();
    const { playlists, refetch } = useRootPlaylists();
    const [isFollowing, setIsFollowing] = useState(
        playlists ? playlists.map(({ id }) => id).includes(playlist.id) : false
    );

    useEffect(() => {
        if (!playlists) {
            setIsFollowing(false);
            return;
        }

        setIsFollowing(playlists.map(({ id }) => id).includes(playlist.id));
    }, [playlists, playlist]);

    const tracks = useMemo<SafeTrack[]>(() => {
        return playlist.tracks.items.filter(({ track }) => !!track) as SafeTrack[];
    }, [playlist]);

    const handleFollowPlaylist = async () => {
        setIsFollowing(true);
        await followPlaylist(access_token, playlist.id);
        refetch();
    };

    const handleUnfollowPlaylist = async () => {
        setIsFollowing(false);
        await unfollowPlaylist(access_token, playlist.id);
        refetch();
    };

    return (
        <PlaylistContext.Provider
            value={{
                isFollowing,
                tracks,
                totalTracks: playlist.tracks.total,
                handleFollowPlaylist,
                handleUnfollowPlaylist,
            }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export const usePlaylist = () => useContext(PlaylistContext);
