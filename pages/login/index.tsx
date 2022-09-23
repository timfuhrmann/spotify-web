import React from "react";
import { NextPageWithLayout } from "@type/page";
import { Opener } from "../../src/components/shared/Opener/Opener";
import { GetStaticProps } from "next";
import { getSpotifyToken } from "@lib/api/auth";
import { SpotifyTrackObjectCustomized } from "../../src/components/shared/Opener/OpenerProvider";
import { getEditorsPick } from "@lib/api/server/editiors-pick";
import { domAnimation, LazyMotion } from "framer-motion";
import { Meta } from "@lib/meta";

interface LoginProps {
    editorsPick: SpotifyTrackObjectCustomized[];
}

const Login: NextPageWithLayout<LoginProps> = ({ editorsPick }) => {
    return (
        <LazyMotion features={domAnimation}>
            <Meta title="Login" />
            <Opener tracks={editorsPick} />
        </LazyMotion>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const authToken = await getSpotifyToken();
    const editorsPick = await getEditorsPick(authToken.access_token);

    return {
        props: { editorsPick },
        revalidate: 60 * 60 * 24, // 24 hours
    };
};

export default Login;
