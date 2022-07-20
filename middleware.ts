import { NextRequest, NextResponse } from "next/server";
import {
    COOKIES_ACCESS_TOKEN,
    COOKIES_REFRESH_TOKEN,
    getCookieSetOptions,
} from "@lib/api/auth/cookie";
import { getRefreshedSpotifyAccessToken } from "@lib/api/auth/access-token";

const PUBLIC_FILE = /\.(.*)$/;

const UNPROTECTED_PAGES = ["/login"];

const shouldHandleRequest = (path: string): boolean => {
    return !PUBLIC_FILE.test(path) && !path.includes("/api/") && !path.includes("/_next/image");
};

const shouldHandleAuthProtection = (path: string): boolean => {
    return !UNPROTECTED_PAGES.includes(path);
};

const handleRefreshAccessToken = async (
    res: NextResponse,
    refresh_token: string
): Promise<string | undefined> => {
    try {
        const auth = await getRefreshedSpotifyAccessToken(refresh_token);

        res.cookies.set(COOKIES_ACCESS_TOKEN, auth.refresh_token, getCookieSetOptions());
        res.cookies.set(
            COOKIES_ACCESS_TOKEN,
            auth.access_token,
            getCookieSetOptions(auth.expires_in)
        );

        return auth.access_token;
    } catch (e) {}
};

export default async function handler(req: NextRequest) {
    const url = req.nextUrl.clone();
    const res = NextResponse.next();

    if (shouldHandleRequest(url.pathname)) {
        let access_token = req.cookies.get(COOKIES_ACCESS_TOKEN);
        let refresh_token = req.cookies.get(COOKIES_REFRESH_TOKEN);

        if (!access_token && refresh_token) {
            access_token = await handleRefreshAccessToken(res, refresh_token);
        }

        if (shouldHandleAuthProtection(url.pathname) && !access_token) {
            url.pathname = "/login";
            return NextResponse.rewrite(url);
        } else if (!shouldHandleAuthProtection(url.pathname) && access_token) {
            url.pathname = "/";
            return NextResponse.rewrite(url);
        }
    }

    return res;
}
