import { NextApiRequest, NextApiResponse } from "next";
import {
    COOKIES_REFRESH_TOKEN,
    removeAuthCookies,
    setAccessTokenCookie,
} from "@lib/api/auth/cookie";
import { getRefreshedSpotifyAccessToken } from "@lib/api/auth/access-token";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const refresh_token = req.cookies[COOKIES_REFRESH_TOKEN];

        if (!refresh_token) {
            return res.status(401).end();
        }

        const auth = await getRefreshedSpotifyAccessToken(refresh_token);
        setAccessTokenCookie(res, auth.access_token, auth.expires_in);

        return res.status(200).json({ access_token: auth.access_token });
    } catch (e) {
        removeAuthCookies(res);
        console.error(e);
        return res.status(500).end();
    }
}
