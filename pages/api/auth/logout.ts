import { NextApiRequest, NextApiResponse } from "next";
import { removeAuthCookies } from "@lib/api/auth/cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    removeAuthCookies(res);
    return res.redirect("/");
}
