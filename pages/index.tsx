import React from "react";
import { NextPageWithLayout } from "@type/page";
import { PrimaryLayout } from "../src/components/layout/PrimaryLayout";

const Home: NextPageWithLayout = () => {
    return <div>home</div>;
};

// eslint-disable-next-line react/display-name
Home.getLayout = page => {
    return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default Home;
