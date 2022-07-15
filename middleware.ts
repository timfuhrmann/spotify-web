import { NextRequest, NextResponse } from "next/server";
import { COOKIES_ACCESS_TOKEN } from "@lib/api/auth/cookie";

const PUBLIC_FILE = /\.(.*)$/;

const UNPROTECTED_PAGES = ["/login"];

const shouldHandleRequest = (path: string): boolean => {
    return !PUBLIC_FILE.test(path) && !path.includes("/api/") && !path.includes("/_next/image");
};

const shouldHandleAuthProtection = (path: string): boolean => {
    return !UNPROTECTED_PAGES.includes(path);
};

export default async function handler(req: NextRequest) {
    const url = req.nextUrl.clone();
    const res = NextResponse.next();

    if (shouldHandleRequest(url.pathname)) {
        const access_token = req.cookies.get(COOKIES_ACCESS_TOKEN);

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
