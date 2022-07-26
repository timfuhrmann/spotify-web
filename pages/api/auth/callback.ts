import { NextApiRequest, NextApiResponse } from "next";
import { getSpotifyAccessToken } from "@lib/api/auth/access-token";
import { removeAuthCookies, setAuthCookies } from "@lib/api/auth/cookie";
import { getCurrentUser } from "@lib/api/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { code } = req.query;

        if (!code || "string" !== typeof code) {
            return res.status(400).end();
        }

        const auth = await getSpotifyAccessToken(code);

        if (auth.access_token) {
            const user = await getCurrentUser(auth.access_token);
            setAuthCookies(res, auth, user);
            return res.redirect("/");
        }

        return res.status(500).send("Error trying to authenticate.");
    } catch (e) {
        removeAuthCookies(res);
        console.error(e);
        return res.status(500).send("Error trying to authenticate.");
    }
}
