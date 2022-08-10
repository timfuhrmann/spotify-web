import axios, { AxiosError, AxiosRequestConfig } from "axios";
import throttle from "lodash.throttle";
import { QueryClient } from "react-query";
import { configSpotify } from "@lib/api/auth";

const isUnauthorized = (err: unknown) => {
    const error = err as AxiosError;
    return error && error.response && error.response.status === 401;
};

const onError = throttle(async (err: unknown) => {
    if (isUnauthorized(err)) {
        await fetch("/api/auth/refresh");
        await queryClient.refetchQueries(["session"]);
        queryClient.refetchQueries();
    }
}, 10000);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (count, err) => {
                if (isUnauthorized(err)) {
                    return false;
                }

                return count < 4;
            },
            onError,
        },
        mutations: {
            onError,
            retryDelay: 2000,
            retry: (count, err) => {
                if (isUnauthorized(err)) {
                    return false;
                }

                return count < 2;
            },
        },
    },
});

const client = axios.create({ baseURL: configSpotify.host });

export const request = <T = unknown>(
    access_token: string,
    options: AxiosRequestConfig
): Promise<T> => {
    client.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    return client(options).then(response => response.data);
};
