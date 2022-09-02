import axios from "axios";
import { configSpotify } from "@lib/api/auth";

export const getArtistsById = async (ids: string[], authToken: string) => {
    const response = await axios.get<SpotifyApi.MultipleArtistsResponse>(
        configSpotify.host + "/artists",
        {
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + authToken },
            params: { ids: ids.join(",") },
        }
    );

    return response.data.artists;
};
