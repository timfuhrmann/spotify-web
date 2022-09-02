import axios from "axios";
import { getArtistsById } from "./artist";
import { configSpotify } from "@lib/api/auth";
import { SpotifyTrackObjectCustomized } from "../../../components/shared/Opener/OpenerProvider";
import { getTracksById } from "@lib/api/server/tracks";

const SPOTIFY_EDITORS_PICK = "0itIEsvSZRWmUHp2YnaA8H";

export const getEditorsPick = async (
    authToken: string
): Promise<SpotifyTrackObjectCustomized[]> => {
    const response = await axios.get<SpotifyApi.PlaylistObjectFull>(
        configSpotify.host + "/playlists/" + SPOTIFY_EDITORS_PICK,
        {
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + authToken },
        }
    );

    const ids = response.data.tracks.items.flatMap(item => (item.track ? item.track.id : []));
    const tracks = await getTracksById(ids, authToken);

    const artists = await Promise.all(
        tracks.map(track =>
            getArtistsById(
                track.artists.map(artist => artist.id),
                authToken
            )
        )
    );

    return tracks
        .map((track, index) => ({ ...track, artists: artists[index] }))
        .filter(track => track.preview_url && track.artists[0] && track.artists[0].images[0])
        .slice(0, 20);
};
