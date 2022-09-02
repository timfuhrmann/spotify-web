import axios from "axios";
import { configSpotify } from "@lib/api/auth";

export const getTracksById = async (ids: string[], authToken: string) => {
    const response = await axios.get<SpotifyApi.MultipleTracksResponse>(
        configSpotify.host + "/tracks",
        {
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + authToken },
            params: { ids: ids.join(",") },
        }
    );

    return response.data.tracks;
};
