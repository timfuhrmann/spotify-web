import { NextApiRequest, NextApiResponse } from "next";
import { getSpotifyAccessToken } from "@lib/api/auth/access-token";
import { setAuthCookies } from "@lib/api/auth/cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { code } = req.query;

        if (!code || "string" !== typeof code) {
            return res.status(400).end();
        }

        const auth = await getSpotifyAccessToken(code);

        if (auth.access_token) {
            setAuthCookies(res, auth);
            return res.redirect("/");
        }

        return res.status(500).send("Error trying to authenticate.");
    } catch (e) {
        console.error(e);
        return res.status(500).send("Error trying to authenticate.");
    }
}
