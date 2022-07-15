import { SpotifyAuth } from "@lib/api/auth";
import { NextApiResponse } from "next";
import { destroyCookie, setCookie } from "nookies";

export const COOKIES_REFRESH_TOKEN = "sw_rf";

export const COOKIES_ACCESS_TOKEN = "sw_at";

export const COOKIES_DEL_OPTIONS = {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    secure: "development" !== process.env.NODE_ENV,
};

export const getCookieSetOptions = (maxAge = 60 * 60 * 24 * 10) => {
    return {
        httpOnly: true,
        path: "/",
        secure: "development" !== process.env.NODE_ENV,
        maxAge,
    };
};

export const setAuthCookies = (res: NextApiResponse, auth: SpotifyAuth) => {
    setAccessTokenCookie(res, auth.access_token, auth.expires_in);
    setRefreshTokenCookie(res, auth.refresh_token);
};

export const removeAuthCookies = (res: NextApiResponse) => {
    removeAccessTokenCookie(res);
    removeRefreshTokenCookie(res);
};

export const setAccessTokenCookie = (
    res: NextApiResponse,
    access_token: string,
    expires_in: number
) => {
    return setCookie({ res }, COOKIES_ACCESS_TOKEN, access_token, getCookieSetOptions(expires_in));
};

export const setRefreshTokenCookie = (res: NextApiResponse, refresh_token: string) => {
    return setCookie({ res }, COOKIES_REFRESH_TOKEN, refresh_token, getCookieSetOptions());
};

export const removeAccessTokenCookie = (res: NextApiResponse) => {
    destroyCookie({ res }, COOKIES_ACCESS_TOKEN, COOKIES_DEL_OPTIONS);
};

export const removeRefreshTokenCookie = (res: NextApiResponse) => {
    destroyCookie({ res }, COOKIES_REFRESH_TOKEN, COOKIES_DEL_OPTIONS);
};
