import axios, { AxiosRequestConfig } from "axios";
import { QueryClient } from "react-query";
import { configSpotify } from "@lib/api/auth";

export const queryClient = new QueryClient();

const client = axios.create({ baseURL: configSpotify.host });

export const request = (access_token: string, options: AxiosRequestConfig) => {
    client.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    return client(options).then(response => response.data);
};
