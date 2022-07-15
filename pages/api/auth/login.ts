import { NextApiRequest, NextApiResponse } from "next";
import { getSpotifyLoginUrl } from "@lib/api/auth/login";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.redirect(getSpotifyLoginUrl());
}
