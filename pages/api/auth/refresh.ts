import { NextApiRequest, NextApiResponse } from "next";
import { COOKIES_REFRESH_TOKEN, setAuthCookies } from "@lib/api/auth/cookie";
import { getRefreshedSpotifyAccessToken } from "@lib/api/auth/access-token";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const refresh_token = req.cookies[COOKIES_REFRESH_TOKEN];

        console.log(refresh_token);

        if (!refresh_token) {
            return res.status(401).end();
        }

        const auth = await getRefreshedSpotifyAccessToken(refresh_token);

        setAuthCookies(res, auth);

        return res.status(200).json({ access_token: auth.access_token });
    } catch (e) {
        console.error(e);
        return res.status(500).end();
    }
}
