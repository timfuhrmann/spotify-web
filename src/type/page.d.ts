import { NextPage } from "next";
import { ReactNode, ReactElement } from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
    getLayout?: (_page: ReactElement) => ReactNode;
};
