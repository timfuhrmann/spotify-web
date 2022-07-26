import { COOKIES_ACCESS_TOKEN, COOKIES_USER } from "@lib/api/auth/cookie";
import { NextRequest } from "next/server";

export const config = {
    runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
    const access_token = req.cookies.get(COOKIES_ACCESS_TOKEN);
    const user = req.cookies.get(COOKIES_USER);

    if (access_token) {
        return new Response(
            JSON.stringify({ access_token, user: user ? JSON.parse(user) : undefined }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } else {
        return new Response(null, {
            status: 401,
        });
    }
}
